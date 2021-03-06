#!/usr/bin/env bash

cp -r $VIVO_ORIG_HOME/* $VIVO_HOME

if [ ! -f "$VIVO_HOME/runtime.properties" ]; then
    cp $VIVO_HOME/config/example.runtime.properties $VIVO_HOME/runtime.properties
fi

if [ ! -f "$VIVO_HOME/config/applicationSetup.n3" ]; then
    cp $VIVO_HOME/config/example.applicationSetup.n3 $VIVO_HOME/config/applicationSetup.n3
fi

cd $CATALINA_HOME
catalina.sh run
