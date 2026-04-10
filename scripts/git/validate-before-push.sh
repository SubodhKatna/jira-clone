#!/usr/bin/env sh

set -eu

echo "Running lint, typecheck, and production build before push..."
npm run validate
