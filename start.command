#!/bin/bash
~/Documents/Arbeit/syncrypt-client/bin/syncrypt_daemon &
cd ~/Documents/Arbeit/syncrypt-desktop
npm install && npm run dev
