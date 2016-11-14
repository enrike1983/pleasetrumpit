SSH_HOST=188.166.108.74
SSH_USER=eric
WEB_DIR=/home/eric/pleasetrumpit

compile-assets:
	gulp

rsync:
	rsync -az --no-perms --delete -i --omit-dir-times . ${SSH_USER}@${SSH_HOST}:${WEB_DIR} --exclude-from 'exclude-list.txt'


deploy: compile-assets rsync
