
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  emailVerified: 'emailVerified',
  name: 'name',
  image: 'image',
  avatarUrl: 'avatarUrl',
  bio: 'bio',
  location: 'location',
  website: 'website',
  company: 'company',
  passwordHash: 'passwordHash',
  githubId: 'githubId',
  githubToken: 'githubToken',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.SSHKeyScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  fingerprint: 'fingerprint',
  publicKey: 'publicKey',
  createdAt: 'createdAt'
};

exports.Prisma.AccessTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  tokenHash: 'tokenHash',
  scopes: 'scopes',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  displayName: 'displayName',
  description: 'description',
  avatarUrl: 'avatarUrl',
  createdAt: 'createdAt'
};

exports.Prisma.OrganizationMemberScalarFieldEnum = {
  id: 'id',
  orgId: 'orgId',
  userId: 'userId',
  role: 'role'
};

exports.Prisma.TeamScalarFieldEnum = {
  id: 'id',
  orgId: 'orgId',
  name: 'name',
  description: 'description'
};

exports.Prisma.RepositoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ownerId: 'ownerId',
  orgId: 'orgId',
  description: 'description',
  visibility: 'visibility',
  defaultBranch: 'defaultBranch',
  isArchived: 'isArchived',
  isTemplate: 'isTemplate',
  starsCount: 'starsCount',
  forksCount: 'forksCount',
  diskPath: 'diskPath',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StarScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  repoId: 'repoId',
  createdAt: 'createdAt'
};

exports.Prisma.RepositoryMemberScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  userId: 'userId',
  role: 'role'
};

exports.Prisma.BranchRuleScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  pattern: 'pattern',
  requireReview: 'requireReview',
  requiredReviews: 'requiredReviews',
  requireChecks: 'requireChecks',
  restrictForcePush: 'restrictForcePush'
};

exports.Prisma.IssueScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  number: 'number',
  title: 'title',
  body: 'body',
  state: 'state',
  authorId: 'authorId',
  assigneeId: 'assigneeId',
  milestoneId: 'milestoneId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IssueCommentScalarFieldEnum = {
  id: 'id',
  issueId: 'issueId',
  authorId: 'authorId',
  body: 'body',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LabelScalarFieldEnum = {
  id: 'id',
  name: 'name',
  color: 'color',
  description: 'description'
};

exports.Prisma.IssueLabelScalarFieldEnum = {
  issueId: 'issueId',
  labelId: 'labelId'
};

exports.Prisma.MilestoneScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  dueDate: 'dueDate'
};

exports.Prisma.PullRequestScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  number: 'number',
  title: 'title',
  body: 'body',
  state: 'state',
  sourceBranch: 'sourceBranch',
  targetBranch: 'targetBranch',
  authorId: 'authorId',
  isDraft: 'isDraft',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PullRequestReviewScalarFieldEnum = {
  id: 'id',
  pullRequestId: 'pullRequestId',
  reviewerId: 'reviewerId',
  state: 'state',
  body: 'body',
  createdAt: 'createdAt'
};

exports.Prisma.DiscussionScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  authorId: 'authorId',
  title: 'title',
  body: 'body',
  category: 'category',
  createdAt: 'createdAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.ProjectItemScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  title: 'title',
  status: 'status',
  issueId: 'issueId',
  prId: 'prId'
};

exports.Prisma.ReleaseScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  tagName: 'tagName',
  title: 'title',
  body: 'body',
  isDraft: 'isDraft',
  isPrerelease: 'isPrerelease',
  createdAt: 'createdAt'
};

exports.Prisma.WorkflowScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  name: 'name',
  filePath: 'filePath'
};

exports.Prisma.WorkflowRunScalarFieldEnum = {
  id: 'id',
  workflowId: 'workflowId',
  commitSha: 'commitSha',
  branch: 'branch',
  status: 'status',
  logs: 'logs',
  createdAt: 'createdAt'
};

exports.Prisma.PackageScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  name: 'name',
  type: 'type',
  version: 'version',
  downloadCount: 'downloadCount',
  createdAt: 'createdAt'
};

exports.Prisma.DeploymentScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  environment: 'environment',
  status: 'status',
  url: 'url',
  createdAt: 'createdAt'
};

exports.Prisma.SecretScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  name: 'name',
  valueEnc: 'valueEnc',
  createdAt: 'createdAt'
};

exports.Prisma.WebhookScalarFieldEnum = {
  id: 'id',
  repoId: 'repoId',
  url: 'url',
  secret: 'secret',
  events: 'events',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  message: 'message',
  link: 'link',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.AuditEventScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  action: 'action',
  details: 'details',
  ipAddress: 'ipAddress',
  createdAt: 'createdAt'
};

exports.Prisma.AgentRunScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  task: 'task',
  status: 'status',
  logs: 'logs',
  output: 'output',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Account: 'Account',
  Session: 'Session',
  VerificationToken: 'VerificationToken',
  SSHKey: 'SSHKey',
  AccessToken: 'AccessToken',
  Organization: 'Organization',
  OrganizationMember: 'OrganizationMember',
  Team: 'Team',
  Repository: 'Repository',
  Star: 'Star',
  RepositoryMember: 'RepositoryMember',
  BranchRule: 'BranchRule',
  Issue: 'Issue',
  IssueComment: 'IssueComment',
  Label: 'Label',
  IssueLabel: 'IssueLabel',
  Milestone: 'Milestone',
  PullRequest: 'PullRequest',
  PullRequestReview: 'PullRequestReview',
  Discussion: 'Discussion',
  Project: 'Project',
  ProjectItem: 'ProjectItem',
  Release: 'Release',
  Workflow: 'Workflow',
  WorkflowRun: 'WorkflowRun',
  Package: 'Package',
  Deployment: 'Deployment',
  Secret: 'Secret',
  Webhook: 'Webhook',
  Notification: 'Notification',
  AuditEvent: 'AuditEvent',
  AgentRun: 'AgentRun'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
