#!groovy

node {
    stage('Build') {
        dir('Vitro') { git branch: 'maint-rel-1.9', url: 'git@github.com:omnisol/Vitro.git' }

        dir('VIVO') {
            git branch: 'omnisol-setup', url: 'git@github.com:omnisol/VIVO.git'

            def buildFolder = "$REAL_JENKINS_HOME/workspace/$JOB_NAME/build"
            sh "rm -rf $buildFolder"

            docker.build('vivo-build', '-f build/Dockerfile ..')
            sh "docker run --rm --volumes-from maven -v $buildFolder/home:/usr/local/vivo/home -v $buildFolder/tomcat:/usr/local/tomcat vivo-build"
        }
    }

}