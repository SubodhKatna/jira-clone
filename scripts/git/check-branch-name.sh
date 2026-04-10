#!/usr/bin/env sh

set -eu

branch_name="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch_name" = "HEAD" ]; then
  echo "Detached HEAD detected. Switch to a named branch before committing."
  exit 1
fi

case "$branch_name" in
  main)
    exit 0
    ;;
  feature/*|fix/*|chore/*|docs/*|refactor/*|test/*)
    suffix="${branch_name#*/}"

    if printf '%s' "$suffix" | grep -Eq '^[a-z0-9]+(-[a-z0-9]+)*$'; then
      exit 0
    fi
    ;;
esac

echo "Invalid branch name: $branch_name"
echo "Use main or a workflow branch like feature/task-name or fix/auth-exception."
exit 1
