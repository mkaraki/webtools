#!/bin/bash

#pnpm run build

mkdir out
cp index.html out
cp 404.html out
cp -r dist out/dist
cp -r pages out/pages

# Cloudflare redirects
cp _redirects out/_redirects