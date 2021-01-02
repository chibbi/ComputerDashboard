#!/bin/sh
if screen -list | grep -q "Dashboard"; then
   echo "Stopping Server"
   screen -X -S "Dashboard" quit
   sleep 0.5
fi
echo "Starting Server"
screen -dmS "Dashboard" npm test
