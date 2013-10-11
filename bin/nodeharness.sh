#!/bin/sh

NODE_EXEC=nodejs

TIME_COMMAND="date +%s"
PREVIOUS_RUN_TIME=`$TIME_COMMAND`

restart_node (){
  $NODE_EXEC app.js &
  NODE_PID=$!
}

restart_node

# inotifywait --excludei=bin|\.git -q -m -r -e modify -e move -e create -e delete ./ | while read line; do
inotifywait -q -m -r -e modify -e move -e create -e delete ./ | while read line; do

  echo "stuff happened"
  NOW=`$TIME_COMMAND`

  if [ "$NOW" -gt "$PREVIOUS_RUN_TIME" ]; then
    # this would be much more elegant if express responded to
    # HUP correctly, for my definition of "correct".

    kill -9 $NODE_PID
    sleep 0.5
    PREVIOUS_RUN_TIME=`$TIME_COMMAND`
    restart_node
    echo "reloaded"
  fi

done
