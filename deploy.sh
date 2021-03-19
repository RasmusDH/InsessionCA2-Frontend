#!/usr/bin/env bash

XXXX="Name or your frontend project, for example movie --> folder you created under /var/www"
DROPLET_URL="URL for your droplet"

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* root@$DROPLET_URL:/var/www/$XXXX

