#!/bin/bash


HOST=appdev.academy
SSH_PORT=1235
REMOTE_DIST_DIRECTORY=/www/appdev.academy-react/
LOCAL_DIST_DIRECTORY=/Users/Maksym/Documents/Web/appdev.academy-react/dist/


# Make production build of JS and CSS
gulp build

# Copy files from local dist directory to remote server
rsync -r -a -v --exclude=.DS_Store -e "ssh -p $SSH_PORT" $LOCAL_DIST_DIRECTORY root@$HOST:$REMOTE_DIST_DIRECTORY

ssh -p $SSH_PORT root@$HOST << SCRIPT
  # Restart Nginx server
  service nginx restart
SCRIPT