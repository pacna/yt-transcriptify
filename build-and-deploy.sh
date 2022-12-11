#!/bin/sh
git push origin --delete gh-pages

echo "\e[1;32mDeploying to gh-pages"
npm run deploy