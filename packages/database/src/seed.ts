import { db } from "./index";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding Hithub SQLite database...");

  // 1. Create Demo User
  const passwordHash = await bcrypt.hash("hithub123", 10);
  
  const user = await db.user.upsert({
    where: { username: "octocat" },
    update: {},
    create: {
      username: "octocat",
      email: "octocat@hithub.com",
      name: "The Hithub Octocat",
      bio: "Building the ultimate open-source software development platform. Self-hosted & AI-native.",
      location: "San Francisco, CA",
      website: "https://hithub.org",
      company: "Hithub Open Source",
      passwordHash,
      role: "ADMIN",
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    },
  });

  console.log(`👤 Created User: ${user.username} (${user.id})`);

  // 2. Create Demo Organization
  const org = await db.organization.upsert({
    where: { name: "hithub-hq" },
    update: {},
    create: {
      name: "hithub-hq",
      displayName: "Hithub Core Team",
      description: "Official core organization maintaining the Hithub software development platform.",
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    },
  });

  // 3. Create Sample Repository
  const repo = await db.repository.upsert({
    where: {
      ownerId_name: {
        ownerId: user.id,
        name: "hithub-core",
      },
    },
    update: {},
    create: {
      name: "hithub-core",
      ownerId: user.id,
      orgId: org.id,
      description: "Complete open-source software development platform — Git hosting, CI/CD, Issues, PRs, and AI sandbox.",
      visibility: "PUBLIC",
      defaultBranch: "main",
      starsCount: 1420,
      forksCount: 289,
    },
  });

  console.log(`📦 Created Repository: ${repo.name} (${repo.id})`);

  // 4. Create Sample Issue
  const issue = await db.issue.upsert({
    where: {
      repoId_number: {
        repoId: repo.id,
        number: 1,
      },
    },
    update: {},
    create: {
      repoId: repo.id,
      number: 1,
      title: "Add support for WebAuthn passkeys in 2FA settings",
      body: "We should allow users to register FIDO2 / WebAuthn passkeys for hardware security keys like YubiKeys.",
      state: "OPEN",
      authorId: user.id,
      assigneeId: user.id,
    },
  });

  // 5. Create Sample Issue Comment
  await db.issueComment.create({
    data: {
      issueId: issue.id,
      authorId: user.id,
      body: "Great feature request! We can implement WebAuthn using standard browser APIs and store key credentials in the `SSHKey` / credentials model.",
    },
  });

  // 6. Create Sample Pull Request
  const pr = await db.pullRequest.upsert({
    where: {
      repoId_number: {
        repoId: repo.id,
        number: 2,
      },
    },
    update: {},
    create: {
      repoId: repo.id,
      number: 2,
      title: "feat(ci): Add matrix build executor for Hithub Actions",
      body: "This PR introduces multi-OS and multi-version matrix build support in the Hithub Actions YAML runner engine.",
      state: "OPEN",
      sourceBranch: "feat/matrix-builds",
      targetBranch: "main",
      authorId: user.id,
    },
  });

  // 7. Create Sample Discussion
  await db.discussion.create({
    data: {
      repoId: repo.id,
      authorId: user.id,
      title: "Welcome to Hithub Community Discussions!",
      body: "Feel free to post questions, share ideas for new plugins, or showcase what you are building with self-hosted Hithub.",
      category: "General",
    },
  });

  // 8. Create Sample Workflow Run
  const workflow = await db.workflow.create({
    data: {
      repoId: repo.id,
      name: "CI Pipeline",
      filePath: ".hithub/workflows/ci.yml",
    },
  });

  await db.workflowRun.create({
    data: {
      workflowId: workflow.id,
      commitSha: "a1b2c3d4e5f67890123456789abcdef012345678",
      branch: "main",
      status: "SUCCESS",
      logs: "✓ Setup Node.js v22.3.0\n✓ Install dependencies\n✓ Run linter\n✓ Execute 142 unit tests\n✓ Build production bundle\n🎉 Build completed successfully in 18s.",
    },
  });

  console.log("✅ Database seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
