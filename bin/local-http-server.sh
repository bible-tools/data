#!/usr/bin/env bash

readonly SCRIPT_SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${SCRIPT_SOURCE}/.. || exit 1

declare PORT
declare DEFAULT_PORT=8080

if [[ -z "$1" ]]; then
  PORT="$DEFAULT_PORT"
else
  PORT="$1"
fi

if [[ "$1" == "-h" ]] || [[ "$1" == "-help" ]] || [[ "$1" == "--help" ]]; then
  echo $0 will serve the files of the directory it is launched from and will default to port $DEFAULT_PORT.
  echo
  echo example usage: $0 3000
  echo
  echo 0
fi

npx http-server -a 0.0.0.0 -p $PORT --cors="Access-Control-Allow-Origin"
