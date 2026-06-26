#!/usr/bin/env sh
set -eu

required_hugo_version="0.87.0"
hugo_bin="${HUGO_BIN:-hugo}"

if ! command -v "$hugo_bin" >/dev/null 2>&1; then
  echo "Hugo ${required_hugo_version} is not installed. Install the pinned Hugo version, then rerun scripts/build-site.sh." >&2
  exit 127
fi

hugo_version="$("$hugo_bin" version)"
case "$hugo_version" in
  *"v${required_hugo_version}"*|*" ${required_hugo_version}"*) ;;
  *)
    echo "This restored source is pinned to Hugo ${required_hugo_version}; found: ${hugo_version}" >&2
    echo "Use Hugo ${required_hugo_version} or set HUGO_BIN to a compatible binary." >&2
    exit 1
    ;;
esac

"$hugo_bin" --cleanDestinationDir
