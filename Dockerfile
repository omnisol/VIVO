FROM omnisol/tomcat

ARG VIVO_VERSION
ENV VIVO_VERSION $VIVO_VERSION

ENV VIVO_ORIG_HOME /opt/vivo/home
ENV VIVO_HOME /usr/local/vivo/home

COPY home $VIVO_ORIG_HOME/
COPY tomcat $CATALINA_HOME/
COPY server.xml $CATALINA_HOME/conf
COPY docker-entrypoint.sh $CATALINA_HOME/bin

VOLUME $VIVO_HOME

CMD ["docker-entrypoint.sh"]