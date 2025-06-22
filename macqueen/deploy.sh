#!/bin/sh
set -e

echo "Building project..."
npm run build

# Create a temporary directory for deployment
echo "Preparing deployment directory..."
rm -rf .deploy_gh-pages
mkdir .deploy_gh-pages

# Copy the built files into the subdirectory
# This structure will result in the files being at /macqueen/ on the server
mkdir .deploy_gh-pages/macqueen
cp -r dist/* .deploy_gh-pages/macqueen/

# Deploy to gh-pages branch
echo "Deploying to gh-pages branch..."
gh-pages -d .deploy_gh-pages

# Clean up
echo "Cleaning up..."
rm -rf .deploy_gh-pages

echo "Deployment successful! Site will be at /macqueen/" 