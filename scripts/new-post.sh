#!/usr/bin/env sh
set -eu

if [ "$#" -lt 1 ]; then
  echo "Usage: scripts/new-post.sh \"Post title\" [YYYY-MM-DD]" >&2
  exit 1
fi

title=$1
date_value=${2:-$(date +%Y-%m-%d)}
slug=$(printf "%s" "$title" \
  | tr '[:upper:]' '[:lower:]' \
  | sed 's/[^a-z0-9]/-/g; s/-\{1,\}/-/g; s/^-//; s/-$//')

if [ -z "$slug" ]; then
  echo "Could not derive a slug from title: $title" >&2
  exit 1
fi

target="content/post/${date_value}-${slug}.md"

if [ -e "$target" ]; then
  echo "Post already exists: $target" >&2
  exit 1
fi

cat > "$target" <<EOF
---
title: "$title"
date: ${date_value}T09:00:00+02:00
draft: true
categories:
- category
tags:
- tag
keywords:
- keyword
# thumbnailImage: /post/${slug}/cover.jpg
# thumbnailImagePosition: bottom
# coverImage: /post/${slug}/cover.jpg
---

Write the introduction here.

<!--more-->

Write the rest of the post here.
EOF

echo "Created $target"
