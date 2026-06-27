---
description: Push all code to GitHub, ensure README/Pages/repo metadata are up to date, and run a security scan before publishing
---

Run the following steps in order, in this repository (`c:\Users\Admin\Desktop\Softwaredevelopment`):

1. **Security scan before publishing anything.** Before staging or pushing any changes, scan the working tree for sensitive data that should never reach a public GitHub repo: API keys/tokens, passwords, private keys (`.pem`, `.key`), `.env` files with real secrets, connection strings, or other credentials. Check both new/modified files and anything already tracked. If anything sensitive is found:
   - Stop and do not push.
   - Tell the user exactly what was found and where.
   - Do not attempt to silently remove it from history yourself — ask the user how they want to handle it (e.g. add to `.gitignore`, rotate the credential, rewrite history).
   Only proceed to the next steps if the scan is clean.

2. **Push/update all code to GitHub.** Stage all changes (`git add -A`), commit with a descriptive message summarizing what changed, and push to `origin main`. If there's nothing to commit, say so and continue to the remaining steps anyway (they may still need updating).

3. **Create or update the README.** Ensure `README.md` accurately describes the project (what it is, key files/sections, how to preview locally, deployment info). Write it as clean UTF-8 — do not use shell redirection (`echo >>`) to create/edit it, since that has previously produced corrupted/UTF-16 output in this repo. Use the file-editing tool directly. Commit and push if it changed.

4. **Set up GitHub Pages via GitHub Actions.** Ensure `.github/workflows/*.yml` contains a workflow that deploys the static site to GitHub Pages on push to `main`, using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`. If it already exists and is correct, leave it as is. Commit and push if it changed. Remind the user that the repository's Settings → Pages → Source must be set to "GitHub Actions" (this is a manual one-time step on GitHub that cannot be done via git push) if it isn't already.

5. **Update the repo "About" section with the Pages link.** The GitHub repo description/about field and topics can only be updated via the GitHub API or web UI, not via `git push`. Check whether the `gh` CLI is installed and authenticated:
   - If `gh` is available and authenticated, use it to update the repo description and homepage URL (`gh repo edit --description "..." --homepage "https://<owner>.github.io/<repo>/"`).
   - If not, tell the user the Pages URL to paste into the repo's About section manually (Settings page, gear icon next to "About" on the repo home page), since this step needs their GitHub credentials.

6. **Final summary.** Report what was pushed, the Pages URL, and the result of the security scan. If any step was skipped or needs manual action from the user, call that out explicitly.
