#!/usr/bin/env sh

set -e

npm run build

cd dist

echo data > .gitignore

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/electrical-block/new-electrical-block.git master:gh-pages

cd -