#!/usr/bin/env bash

set -e

#
# Deploy Vite site to GitHub Pages
# Victor-style formatting, no bird-flock nonsense.
#

info ()
{
  echo ' INFO ->> '"$@"
}

abort()
{
  echo ' FAIL ->> '"$@"
}

[ -d dist ] && rm -rf dist && info 'Removed "dist/" for clean build'

info 'Building site'
npm run build || abort 'npm run build failed'

# Create worktree only if it doesn't exist
if [ ! -d '.git/worktrees/gh-pages' ]
then
  info 'Preparing gh-pages worktree'
  git worktree add gh-pages || abort 'worktree "gh-pages" creation failure'
fi

[ -d '.git/worktrees/gh-pages' ] && info 'Confirmed "gh-pages" worktree readiness'

(
  info 'Clearing gh-pages branch'
  cd gh-pages  || abort 'Failed to locate "gh-pages"'
  git rm -rf . || abort 'git rm -rf .'

  ## Seems wrong without the .git/ the push is confused and thinks we're checking on "main"
  # rm -rf ./*

  find . -type f -not -path './.git/*'

  info 'Moving dist/ output into gh-pages/'
  mv ../dist/* . || abort 'dist/ moove failed'

  info 'Committing build'
  git add .  || abort 'git add . failed'
  git commit -m 'Deploy site as "gh-pages"' || abort 'git commit -m "Deploy site" failed'

  info 'Pushing to origin gh-pages (publish)'
  git push origin gh-pages || abort 'Push "gh-pages" failed'

  find . -type f -not -path './.git/*'

  info 'Deployment complete'
)

## vim: nu et ts=2 sw=2
## END
