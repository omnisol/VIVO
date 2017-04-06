#!groovy

node {
    catchError {
        stage('Build') {
            dir('Vitro') {
                git branch: 'maint-rel-1.9', url: 'git@github.com:omnisol/Vitro.git'
            }

            dir('VIVO') {
                git branch: 'omnisol-setup', url: 'git@github.com:omnisol/VIVO.git'

                def realBuildFolder = "$REAL_JENKINS_HOME/workspace/$JOB_NAME/build"
                sh "rm -rf $WORKSPACE/build && mkdir -p $WORKSPACE/build/home && mkdir -p $WORKSPACE/build/tomcat"

                docker.build('vivo-build', '-f build/Dockerfile ..')
                sh "docker run --rm --volumes-from maven -v $realBuildFolder/home:/usr/local/vivo/home -v $realBuildFolder/tomcat:/usr/local/tomcat vivo-build"
                sh "cp Dockerfile build/server.xml build/docker-entrypoint.sh $WORKSPACE/build"
            }
        }

        stage('Image') {
            def revision = readFile 'VIVO/revision'
            def version = "1.9.2-$revision"
            def imageName = "omnisol/vivo:$version"

            if (imageExists(imageName)) {
                error "Image $imageName already exists"
            }

            dir('build') {
                def image = docker.build(imageName, "--build-arg VIVO_VERSION=$version .")
                image.push()
                image.push('latest')

                currentBuild.displayName += " - $version"
            }
        }
    }
}

def imageExists(String imageName) {
    def result = sh returnStatus: true, script: "docker pull $imageName"
    return result == 0
}
