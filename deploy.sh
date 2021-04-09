#!/bin/bash
git pull && export NODE_OPTIONS=--max_old_space_size=2048 && npm install && npm run client:install && npm run client:build && pm2 restart all`