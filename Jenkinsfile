#!groovy

node {
    catchError {
        stage('Build') {
            dir('Vitro') {
                git branch: 'omnisol', url: 'git@bitbucket.org:omnisol-code/vitro.git'
            }

            dir('VIVO') {
                git branch: 'tomcat9', url: 'git@bitbucket.org:omnisol-code/vivo.git'

                def realBuildFolder = "$REAL_JENKINS_HOME/workspace/$JOB_NAME/build"
                sh "rm -rf $WORKSPACE/build && mkdir -p $WORKSPACE/build/home && mkdir -p $WORKSPACE/build/tomcat"

                docker.build('vivo-build', '-f build/Dockerfile ..')
                sh "docker run --rm -v $realBuildFolder/home:/usr/local/vivo/home -v $realBuildFolder/tomcat:/usr/local/tomcat vivo-build"
                sh "cp Dockerfile build/server.xml build/docker-entrypoint.sh $WORKSPACE/build"
            }
        }

        stage('Image') {
            def revision = readFile 'VIVO/revision'
            def version = "1.9.2-$revision"

            dir('build') {
                image.build(name: "omnisol/vivo", version: version)
            }

            currentBuild.displayName += " - $version"
        }
    }
}
