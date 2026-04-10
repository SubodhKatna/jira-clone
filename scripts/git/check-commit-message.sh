#!/usr/bin/env sh

set -eu

commit_msg_file="$1"
commit_msg="$(sed -n '1p' "$commit_msg_file" | tr -d '\r')"

if [ -z "$commit_msg" ]; then
  echo "Commit message cannot be empty."
  exit 1
fi

if printf '%s' "$commit_msg" | grep -Eq '\.$'; then
  echo "Commit message must not end with a period."
  exit 1
fi

if ! printf '%s' "$commit_msg" | grep -Eq '^(Add|Build|Bump|Change|Configure|Create|Document|Fix|Implement|Improve|Refactor|Release|Remove|Rename|Revert|Test|Update|Upgrade) [A-Za-z0-9]'; then
  echo "Commit message must start with an approved imperative verb, for example:"
  echo "  Implement basic service discovery"
  echo "  Fix auth exception"
  exit 1
fi

message_length="$(printf '%s' "$commit_msg" | wc -c | tr -d ' ')"

if [ "$message_length" -gt 72 ]; then
  echo "Commit message is too long ($message_length characters). Keep it at 72 characters or less."
  exit 1
fi
