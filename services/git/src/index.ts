import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { exec, spawn } from "child_process";
import simpleGit from "simple-git";

const app = express();
const PORT = process.env.GIT_SERVICE_PORT || 8080;
const REPO_ROOT = path.resolve(process.cwd(), "../../data/repositories");

// Ensure repository directory exists
if (!fs.existsSync(REPO_ROOT)) {
  fs.mkdirSync(REPO_ROOT, { recursive: true });
}

app.use(cors());
app.use(express.json());

// 1. Initialize Bare Git Repository
app.post("/api/repos/init", async (req: Request, res: Response) => {
  try {
    const { owner, repoName } = req.body;
    if (!owner || !repoName) {
      return res.status(400).json({ error: "owner and repoName required" });
    }

    const repoPath = path.join(REPO_ROOT, owner, `${repoName}.git`);
    if (!fs.existsSync(repoPath)) {
      fs.mkdirSync(repoPath, { recursive: true });
      const git = simpleGit(repoPath);
      await git.init(true); // Bare repository

      // Create initial seed commit in temporary workdir
      const tempWorkDir = path.join(REPO_ROOT, owner, `_temp_${repoName}`);
      fs.mkdirSync(tempWorkDir, { recursive: true });

      const tempGit = simpleGit(tempWorkDir);
      await tempGit.init();
      fs.writeFileSync(
        path.join(tempWorkDir, "README.md"),
        `# ${repoName}\n\nWelcome to your new repository on Hithub! Self-hosted & open-source.\n`
      );
      fs.writeFileSync(
        path.join(tempWorkDir, ".gitignore"),
        "node_modules/\n.env\ndist/\n"
      );

      await tempGit.add(".");
      await tempGit.commit("Initial commit");
      await tempGit.branch(["-M", "main"]);
      await tempGit.addRemote("origin", repoPath);
      await tempGit.push("origin", "main", ["-u"]);

      // Point HEAD in bare repo to main
      await git.raw(["symbolic-ref", "HEAD", "refs/heads/main"]);

      // Cleanup temp workdir
      fs.rmSync(tempWorkDir, { recursive: true, force: true });
    }

    res.json({ success: true, repoPath });
  } catch (error: any) {
    console.error("Git Init Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 2. Clone a Remote Git Repository into Local Hithub (e.g. from GitHub)
app.post("/api/repos/clone-remote", async (req: Request, res: Response) => {
  try {
    const { owner, repoName, remoteUrl, authToken } = req.body;
    if (!owner || !repoName || !remoteUrl) {
      return res.status(400).json({ error: "owner, repoName, and remoteUrl required" });
    }

    const ownerDir = path.join(REPO_ROOT, owner);
    if (!fs.existsSync(ownerDir)) {
      fs.mkdirSync(ownerDir, { recursive: true });
    }

    const repoPath = path.join(REPO_ROOT, owner, `${repoName}.git`);
    if (fs.existsSync(repoPath)) {
      fs.rmSync(repoPath, { recursive: true, force: true });
    }

    let authenticatedUrl = remoteUrl;
    if (authToken && remoteUrl.startsWith("https://github.com/")) {
      authenticatedUrl = remoteUrl.replace(
        "https://github.com/",
        `https://oauth2:${authToken}@github.com/`
      );
    }

    const git = simpleGit();
    await git.clone(authenticatedUrl, repoPath, ["--bare"]);

    res.json({ success: true, repoPath });
  } catch (error: any) {
    console.error("Git Clone Remote Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Read Repository Tree & Files
app.get("/api/repos/:owner/:repoName/tree", async (req: Request, res: Response) => {
  try {
    const { owner, repoName } = req.params;
    const ref = (req.query.ref as string) || "HEAD";
    const subpath = (req.query.path as string) || "";

    const repoPath = path.join(REPO_ROOT, owner, `${repoName}.git`);
    if (!fs.existsSync(repoPath)) {
      return res.status(404).json({ error: "Repository not found" });
    }

    const git = simpleGit(repoPath);
    const args = ["ls-tree", "-l", ref];
    if (subpath) {
      args.push(`${subpath}/`);
    }
    const treeOutput = await git.raw(args);

    const entries = treeOutput
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        // line format: <mode> <type> <sha> <size> <filename>
        const parts = line.split(/\s+/);
        const type = parts[1];
        const sha = parts[2];
        const size = parts[3] === "-" ? 0 : parseInt(parts[3], 10);
        const name = parts.slice(4).join(" ");
        return {
          name: path.basename(name),
          path: name,
          type: type === "tree" ? "dir" : "file",
          size,
          sha,
        };
      });

    res.json({ entries });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Read File Content (Blob)
app.get("/api/repos/:owner/:repoName/blob", async (req: Request, res: Response) => {
  try {
    const { owner, repoName } = req.params;
    const ref = (req.query.ref as string) || "HEAD";
    const filePath = req.query.path as string;

    if (!filePath) {
      return res.status(400).json({ error: "file path required" });
    }

    const repoPath = path.join(REPO_ROOT, owner, `${repoName}.git`);
    if (!fs.existsSync(repoPath)) {
      return res.status(404).json({ error: "Repository not found" });
    }

    const git = simpleGit(repoPath);
    const content = await git.raw(["show", `${ref}:${filePath}`]);

    res.json({ path: filePath, content });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Read README Content
app.get("/api/repos/:owner/:repoName/readme", async (req: Request, res: Response) => {
  try {
    const { owner, repoName } = req.params;
    const ref = (req.query.ref as string) || "HEAD";
    const repoPath = path.join(REPO_ROOT, owner, `${repoName}.git`);

    if (!fs.existsSync(repoPath)) {
      return res.status(404).json({ error: "Repository not found" });
    }

    const git = simpleGit(repoPath);
    const possibleNames = [
      "README.md",
      "readme.md",
      "README",
      "Readme.md",
      "README.markdown",
      "README.txt",
      "README.rst",
    ];

    for (const name of possibleNames) {
      try {
        const content = await git.raw(["show", `${ref}:${name}`]);
        return res.json({ name, content });
      } catch (e) {
        // try next file name
      }
    }

    res.status(404).json({ error: "README not found" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Read Commit History
app.get("/api/repos/:owner/:repoName/commits", async (req: Request, res: Response) => {
  try {
    const { owner, repoName } = req.params;
    const repoPath = path.join(REPO_ROOT, owner, `${repoName}.git`);

    if (!fs.existsSync(repoPath)) {
      return res.json({ commits: [] });
    }

    const git = simpleGit(repoPath);
    const log = await git.log({ maxCount: 20 });

    res.json({ commits: log.all });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Read Branches
app.get("/api/repos/:owner/:repoName/branches", async (req: Request, res: Response) => {
  try {
    const { owner, repoName } = req.params;
    const repoPath = path.join(REPO_ROOT, owner, `${repoName}.git`);

    if (!fs.existsSync(repoPath)) {
      return res.json({ branches: [] });
    }

    const git = simpleGit(repoPath);
    const branchSummary = await git.branch();

    res.json({ branches: Object.keys(branchSummary.branches) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Download Repository ZIP Archive
app.get("/api/repos/:owner/:repoName/zip", (req: Request, res: Response) => {
  const { owner, repoName } = req.params;
  const repoPath = path.join(REPO_ROOT, owner, `${repoName}.git`);

  if (!fs.existsSync(repoPath)) {
    return res.status(404).send("Repository not found");
  }

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", `attachment; filename="${repoName}.zip"`);

  const gitProcess = spawn("git", ["archive", "--format=zip", "HEAD"], { cwd: repoPath });
  gitProcess.stdout.pipe(res);
  gitProcess.stderr.on("data", (data) => console.error(`git archive error: ${data}`));
});

// 9. Git Smart HTTP Handlers (info/refs, git-upload-pack, git-receive-pack)
app.all("/:owner/:repoName.git/info/refs", (req: Request, res: Response) => {
  const service = req.query.service as string;
  if (service !== "git-upload-pack" && service !== "git-receive-pack") {
    return res.status(400).send("Invalid service");
  }

  const { owner, repoName } = req.params;
  const repoPath = path.join(REPO_ROOT, owner, `${repoName}.git`);

  if (!fs.existsSync(repoPath)) {
    return res.status(404).send("Repository not found");
  }

  res.setHeader("Content-Type", `application/x-${service}-advertisement`);
  res.setHeader("Cache-Control", "no-cache");

  // Output Git HTTP header pkt-line
  const header = `# service=${service}\n`;
  const length = (header.length + 4).toString(16).padStart(4, "0");
  res.write(`${length}${header}0000`);

  const cmd = `${service} --stateless-rpc --advertise-refs "${repoPath}"`;
  exec(cmd, (err, stdout) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    res.write(stdout);
    res.end();
  });
});

app.post("/:owner/:repoName.git/:service", (req: Request, res: Response) => {
  const { service, owner, repoName } = req.params;
  if (service !== "git-upload-pack" && service !== "git-receive-pack") {
    return res.status(400).send("Invalid service");
  }

  const repoPath = path.join(REPO_ROOT, owner, `${repoName}.git`);
  if (!fs.existsSync(repoPath)) {
    return res.status(404).send("Repository not found");
  }

  res.setHeader("Content-Type", `application/x-${service}-result`);
  res.setHeader("Cache-Control", "no-cache");

  const child = spawn(service, ["--stateless-rpc", repoPath]);
  req.pipe(child.stdin);
  child.stdout.pipe(res);
});

app.listen(PORT, () => {
  console.log(`🚀 Hithub Git Smart HTTP Service listening on port ${PORT}`);
  console.log(`📁 Repositories root directory: ${REPO_ROOT}`);
});
