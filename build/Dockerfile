FROM omnisol/maven

ENV VIVO_INSTALL_DIR /opt/vivo
ENV VIVO_HOME /usr/local/vivo/home
env CATALINA_HOME /usr/local/tomcat

USER root
COPY VIVO $VIVO_INSTALL_DIR/VIVO
COPY Vitro $VIVO_INSTALL_DIR/Vitro

RUN chown -R maven:maven $VIVO_INSTALL_DIR \
    && mkdir -p $VIVO_HOME && chown maven:maven $VIVO_HOME \
    && mkdir -p $CATALINA_HOME && chown maven:maven $CATALINA_HOME

USER maven

WORKDIR $VIVO_INSTALL_DIR/VIVO

VOLUME $VIVO_HOME
VOLUME $CATALINA_HOME

CMD ["mvn", "install", "-s", "installer/example-settings.xml"]
