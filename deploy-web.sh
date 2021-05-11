#!/bin/bash
pnpm build
rm -rf ~/Projects/Knowbie/Backend/Realm/website/hosting/files/*
cp -rf  build/*  ~/Projects/Knowbie/Backend/Realm/website/hosting/files
cd ~/Projects/Knowbie/Backend/Realm/website/ && realm-cli push --remote="website-tkniu" --include-hosting
