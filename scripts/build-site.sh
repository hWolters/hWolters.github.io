#!/usr/bin/env sh
set -eu

if ! command -v hugo >/dev/null 2>&1; then
  echo "Hugo is not installed. Install Hugo, then rerun scripts/build-site.sh." >&2
  exit 127
fi

hugo --cleanDestinationDir
