#!/bin/bash
## remove unnecessary files for release
rm -rf \
  ./.git \
  ./.github \
  ./.git* \
  ./*.code-workspace \
  ./icons/*.psd \
  ./icons/*.url

## replace some placeholders in manifest.json
sed -i "s/<<VERSION>>/${VERSION}/g" ./manifest.json
sed -i "s/<<STORE_PUBKEY>>/${STORE_PUBKEY}/g" ./manifest.json

## archive files for release
zip -r nico-dnd-comment.zip ./*
