#!/usr/bin/env bash

if [ ! -f "$VIVO_HOME/runtime.properties" ]; then
    cp -r $VIVO_ORIG_HOME/* $VIVO_HOME
    cp $VIVO_HOME/config/runtime.properties $VIVO_HOME/runtime.properties
    cp $VIVO_HOME/config/example.applicationSetup.n3 $VIVO_HOME/config/applicationSetup.n3
fi

cd $CATALINA_HOME
catalina.sh run
