# GitHub Setup Checklist

Use this checklist to configure your GitHub repository for the branching strategy.

## Prerequisites

- [ ] Repository exists on GitHub
- [ ] You have admin access to the repository
- [ ] `development` branch has been pushed to GitHub

## Step-by-Step Setup

### 1. Set Default Branch

- [ ] Go to: **Settings** → **Branches**
- [ ] Under "Default branch", click the **switch/pencil icon**
- [ ] Select `development` from the dropdown
- [ ] Click **Update**
- [ ] Click **I understand, update the default branch**

**Verify:** Clone the repo fresh - it should checkout `development` by default

---

### 2. Protect `main` Branch

- [ ] Go to: **Settings** → **Branches** → **Branch protection rules**
- [ ] Click **Add rule** (or Add branch protection rule)
- [ ] Branch name pattern: `main`
- [ ] Enable the following settings:

#### Pull Request Settings

- [ ] ☑ **Require a pull request before merging**
  - [ ] ☑ Require approvals: **1**
  - [ ] ☑ Dismiss stale pull request approvals when new commits are pushed

#### Status Check Settings

- [ ] ☑ **Require status checks to pass before merging**
  - [ ] ☑ Require branches to be up to date before merging
  - [ ] Search and add these status checks:
    - [ ] `lint`
    - [ ] `test`
    - [ ] `build`

#### Conversation Settings

- [ ] ☑ **Require conversation resolution before merging**

#### Push Restrictions

- [ ] ☑ **Restrict who can push to matching branches**
  - [ ] Add your admin username or team

#### Additional Settings

- [ ] ☐ Allow force pushes (leave UNCHECKED)
- [ ] ☐ Allow deletions (leave UNCHECKED)

- [ ] Click **Create** or **Save changes**

**Verify:** Try pushing to `main` directly - it should be blocked

---

### 3. Protect `development` Branch

- [ ] Go to: **Settings** → **Branches** → **Add rule**
- [ ] Branch name pattern: `development`
- [ ] Enable the following settings:

#### Pull Request Settings

- [ ] ☑ **Require a pull request before merging**
  - [ ] ☑ Require approvals: **1**

#### Status Check Settings

- [ ] ☑ **Require status checks to pass before merging**
  - [ ] ☑ Require branches to be up to date before merging
  - [ ] Add status checks:
    - [ ] `lint`
    - [ ] `test`
    - [ ] `build`

#### Conversation Settings

- [ ] ☑ **Require conversation resolution before merging**

#### Additional Settings

- [ ] ☐ Allow force pushes (leave UNCHECKED)
- [ ] ☐ Allow deletions (leave UNCHECKED)

- [ ] Click **Create** or **Save changes**

**Verify:** Try pushing to `development` directly - it should be blocked

---

### 4. Configure GitHub Pages

- [ ] Go to: **Settings** → **Pages**
- [ ] Under "Build and deployment":
  - [ ] Source: **Deploy from a branch**
  - [ ] Branch: **`main`** / **`/(root)`**
  - [ ] Click **Save**

- [ ] Wait for deployment (check Actions tab)

**Verify:**

- [ ] Visit: `https://[your-username].github.io/mdeditor-starblaze/`
- [ ] Site should load successfully

---

### 5. Create Production Environment (Optional but Recommended)

- [ ] Go to: **Settings** → **Environments**
- [ ] Click **New environment**
- [ ] Name: `production`
- [ ] Click **Configure environment**

#### Environment Protection Rules

- [ ] ☑ **Required reviewers**
  - [ ] Add yourself or admin team members
- [ ] **Wait timer:** 0 minutes (or set delay if desired)

#### Deployment Branches

- [ ] **Deployment branches:** Select **Selected branches**
  - [ ] Click **Add deployment branch rule**
  - [ ] Branch name pattern: `main`
  - [ ] Click **Add rule**

- [ ] Click **Save protection rules**

**Verify:** Next deployment to `main` will require approval

---

### 6. Choose Staging Environment Option

You need to choose ONE of these options:

#### Option A: Separate GitHub Pages Site (More Setup, Free)

- [ ] Create new repository: `mdeditor-starblaze-staging`
- [ ] Enable GitHub Pages on staging repo (Settings → Pages)
- [ ] Generate deploy token or SSH key
- [ ] Add as repository secret: `STAGING_DEPLOY_TOKEN`
- [ ] Edit `.github/workflows/deploy-staging.yml`
- [ ] Uncomment the `deploy` job
- [ ] Configure deployment to push to staging repo

**Result:** Staging at `https://[username].github.io/mdeditor-starblaze-staging/`

#### Option B: Netlify (Easier, Also Free)

- [ ] Sign up at https://www.netlify.com/
- [ ] Click **Add new site** → **Import an existing project**
- [ ] Connect to GitHub → Select repository
- [ ] Configure:
  - [ ] Branch: `development`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `dist`
  - [ ] Click **Deploy**
- [ ] Go to Site settings → Change site name to `mdeditor-starblaze-staging`

**Result:** Staging at `https://mdeditor-starblaze-staging.netlify.app/`

**Recommended:** Option B (Netlify) - it's easier and provides automatic PR previews!

---

### 7. Test the Workflow

#### Test Feature Branch → Development PR

- [ ] Create test branch: `git checkout -b feature/test-branch`
- [ ] Make small change (edit README)
- [ ] Commit: `npm run commit`
- [ ] Push: `git push origin feature/test-branch`
- [ ] Create PR to `development` on GitHub
- [ ] Verify CI checks run
- [ ] Verify you cannot merge without approval
- [ ] Approve and merge PR
- [ ] Delete feature branch

#### Test Development → Main PR

- [ ] Create PR from `development` to `main`
- [ ] Verify CI checks run
- [ ] Verify additional protections (if configured)
- [ ] Merge PR
- [ ] Verify production deployment starts
- [ ] Check live site updated

---

## Verification Checklist

After setup, verify everything works:

- [ ] **Default branch is `development`**
  - Test: `git clone [repo-url]` → should be on `development`

- [ ] **CI runs on pushes to `main` and `development`**
  - Test: Check Actions tab after push

- [ ] **CI runs on PRs to `main` and `development`**
  - Test: Open a PR, check if CI runs

- [ ] **Cannot push directly to `main`**
  - Test: Try `git push origin main` → should fail

- [ ] **Cannot push directly to `development`**
  - Test: Try `git push origin development` → should fail

- [ ] **PRs to `main` require approval**
  - Test: Create PR to `main` → cannot merge without review

- [ ] **PRs to `development` require approval**
  - Test: Create PR to `development` → cannot merge without review

- [ ] **Production deploys only from `main`**
  - Test: Check `.github/workflows/deploy-gh-pages.yml` runs on `main` only

- [ ] **Staging builds from `development`**
  - Test: Push to `development`, check staging deployment

---

## Common Issues

### "Protected branch hook declined"

This means branch protection is working! You need to:

1. Create a PR instead of pushing directly
2. Get approval if required
3. Ensure CI checks pass

### Status checks not appearing

1. Make sure CI has run at least once on the branch
2. Go to branch protection settings
3. Check "Require branches to be up to date before merging"
4. The status checks should appear in the list

### Deployment not triggering

1. Check `.github/workflows/` files
2. Verify workflow permissions (Settings → Actions → General)
3. Enable "Read and write permissions" for GITHUB_TOKEN if needed

---

## Next Steps

After completing this checklist:

1. [ ] Update README.md with links to:
   - Production site
   - Staging site (if applicable)
   - Branching strategy docs

2. [ ] Share `BRANCHING_STRATEGY.md` with your team

3. [ ] Add any team members to repository with appropriate permissions

4. [ ] Consider setting up:
   - [ ] Issue templates
   - [ ] PR templates
   - [ ] GitHub Projects for task tracking

---

## Quick Links

- [Branching Strategy Guide](./BRANCHING_STRATEGY.md)
- [GitHub Branch Protection Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Netlify Docs](https://docs.netlify.com/)

---

**✅ Setup Complete!** Your repository is now configured for professional development workflow.
