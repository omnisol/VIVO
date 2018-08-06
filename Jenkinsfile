#!groovy

node {
    catchError {
        stage('Build') {
            dir('Vitro') {
                git branch: 'omnisol', url: 'git@github.com:omnisol/Vitro.git'
            }

            dir('VIVO') {
                git branch: 'test', url: 'git@github.com:omnisol/VIVO.git'

                def realBuildFolder = "$REAL_JENKINS_HOME/workspace/$JOB_NAME/build"
                sh "rm -rf $WORKSPACE/build && mkdir -p $WORKSPACE/build/home && mkdir -p $WORKSPACE/build/tomcat"

                docker.build('vivo-build', '-f build/Dockerfile ..')
                sh "docker run --rm -v $realBuildFolder/home:/usr/local/vivo/home -v $realBuildFolder/tomcat:/usr/local/tomcat vivo-build"
                sh "cp Dockerfile build/server.xml build/docker-entrypoint.sh $WORKSPACE/build"
            }
        }

        stage('Image') {
            def revision = "5"
            def version = "1.9.2-test$revision"
            def imageName = "omnisol/vivo:$version"

            if (imageExists(imageName)) {
                error "Image $imageName already exists"
            }

            dir('build') {
                def image = docker.build(imageName, "--build-arg VIVO_VERSION=$version .")
                image.push()
//                image.push('latest')

                currentBuild.displayName += " - $version"
            }
        }
    }
}
