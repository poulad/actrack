#!/usr/bin/env bash

###################################################
#  git worktree add ../Actrack_gh-pages gh-pages  #
###################################################

set -ex

project_dir="$( cd "$(dirname "$0")" ; pwd -P )"
dist_dir="$project_dir/bin/Release/netstandard2.0/publish/Actrack/dist"

rm -rfv "$dist_dir"
dotnet publish -c Release -f netstandard2.0



cd ../../../Actrack_gh-pages
find . -mindepth 1 -not -path './.git' -delete
ls -lah
cp -rv "$dist_dir"/* .

cat index.html | sed 's/<base href="\/"/<base href="\/actrack\/"/' | tee | tee index.html

touch '.nojekyll'


git add .
git commit -m "Publish app to GitHub pages"
git push
