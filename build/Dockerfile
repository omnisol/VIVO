FROM maven:3.3.9-jdk-8

ENV VIVO_INSTALL_DIR /opt/vivo

COPY VIVO $VIVO_INSTALL_DIR/VIVO
COPY Vitro $VIVO_INSTALL_DIR/Vitro

WORKDIR $VIVO_INSTALL_DIR/VIVO

VOLUME /usr/local/vivo/home
VOLUME /usr/local/tomcat

CMD ["mvn", "install", "-s", "installer/example-settings.xml"]
