#!/bin/bash


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR="$( realpath "$DIR/../" )"

cd $ROOT_DIR/packages/server
rm -rf dist
yarn build

cd $ROOT_DIR/packages/webapp
rm -rf dist
yarn build

rm -rf $ROOT_DIR/dist
mkdir -p $ROOT_DIR/dist

cp -r $ROOT_DIR/packages/server/dist/* $ROOT_DIR/dist
mkdir -p $ROOT_DIR/dist/dashboard
cp -r $ROOT_DIR/packages/webapp/dist/* $ROOT_DIR/dist/dashboard
