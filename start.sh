#!/bin/bash
echo "Starting Find Room Application"
echo "initializing server"
cd services
npm start
cd ..
echo "initializing ui"
cd app
npm start