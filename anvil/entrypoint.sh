#!/bin/sh
# This script isn't really needed, as `docker-compose run` will run any arugments as bash commands with anvil.
# However, this allows us to put pre-run commands before user-supplied commands, which could be helpful in the future.
# I didn't want to forget how to do this, so I am leaving it in.
exec "$@"
