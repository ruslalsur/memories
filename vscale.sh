#!/bin/bash
ssh root@31.184.253.169 "cd memories && git pull && export NODE_OPTIONS=--max_old_space_size=4096 && npm install && npm run client:install && npm run client:build && pm2 restart all"