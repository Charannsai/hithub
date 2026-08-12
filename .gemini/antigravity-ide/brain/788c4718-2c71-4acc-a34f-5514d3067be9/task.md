# Hithub Implementation Tasks

## Phase 1: Real GitHub OAuth Authentication
- [x] Add `next-auth` and `@auth/prisma-adapter` dependencies
- [x] Update Prisma schema with Account/Session/VerificationToken models for NextAuth
- [x] Run `prisma db push` to update SQLite
- [x] Create `apps/web/src/lib/auth.ts` — NextAuth config with GitHub provider
- [x] Create `apps/web/src/lib/session.ts` — server-side session helper
- [x] Create `apps/web/src/app/api/auth/[...nextauth]/route.ts` — API handler
- [x] Update sign-in page to use real GitHub OAuth
- [x] Update root layout with session-aware header
- [x] Update `.env` with NextAuth variables

## Phase 2: Session-Aware Pages & Real Data Flow
- [x] Update home page to show logged-in user's repos
- [x] Update repos API to use authenticated user
- [x] Update issues API with auth + PATCH support
- [x] Update import API to use authenticated user
- [x] Update repo layout with real counts, remove hardcoded fallbacks
- [x] Update repo page — remove hardcoded file list fallback

## Phase 3: User Profile & New Repository Creation
- [x] Create user profile page `[owner]/page.tsx`
- [x] Create "New Repository" page `/new/page.tsx`

## Phase 4: Full Issue & Pull Request CRUD
- [x] Create "New Issue" form page `[owner]/[repo]/issues/new/page.tsx`
- [x] Create individual issue detail page with comments `[owner]/[repo]/issues/[number]/page.tsx`
- [x] Create issue comments API `/api/comments`
- [x] Update issues list page with filters and real DB data
- [x] Update pulls list page with filters and real DB data

## Phase 5: Actions, Discussions & Projects (Real Data)
- [x] Update discussions page with real DB queries
- [x] Update projects page with real DB queries (dynamic Kanban board)
- [x] Update settings page with real repo settings from DB
- [x] Update actions page with run workflow functionality & API

## Phase 6: Git Service Enhancements
- [x] Add git-receive-pack & git-upload-pack HTTP RPC endpoints
- [x] Add branches API
