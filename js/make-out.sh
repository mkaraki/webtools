#!/bin/bash

#pnpm run build

mkdir out
cp index.html out
cp 404.html out
cp -r dist out/dist
cp -r pages out/pages
cp -r assets out/assets

# Cloudflare redirects
cp _redirects out/_redirects
