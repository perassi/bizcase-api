pipeline {
  agent any

  environment {
    BUILD_DIR           = 'dist'
    DOCKER_IMAGE        = ''
    COMMIT_SHA          = ''
    BUILD_BRANCH        = 'develop'
    CREDENTIAL_ID       = '29b3215d-b3de-4962-bed9-4d5b60acbbcc'
    DATABASE_USERNAME   = credentials('bizcase-db-username')
    DATABASE_PASSWORD   = credentials('bizcase-db-password')
    DATABASE_PORT       = "5432"
    DATABASE_NAME       = "bizcase"
    GIT_COMMIT_AUTHOR   = ""
    GIT_COMMIT_SHA      = ""
    GIT_DESC            = ""
    DOCKER_HOST         = ""
    JWT_SECERT          = "capadmin_auth_jwt_secret"
    JWT_EXPIRE_IN       = "90d"
  }

  stages {
    stage('setting up env') {
      when {
        branch BUILD_BRANCH
      }
      steps {
        bitbucketStatusNotify ( buildState: 'INPROGRESS' )
        sh 'mkdir -p $WORKSPACE/.yarn-cache'
      }
    }

    stage('build using node:10-alpine') {
      when {
        branch BUILD_BRANCH
      }
      agent {
        docker {
          image 'node:10-alpine'
          args '-v $WORKSPACE/.yarn-cache:/root/.yarn-cache'
        }
      }

      stages {
        stage('setup application dependencies') {
          steps {
              sh 'yarn global add @nestjs/cli'
              sh 'yarn --pure-lockfile'
          }
        }

        stage('test application') {
          steps {
            sh 'yarn test:cov'
          }

          post {
            always {
              step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/cobertura-coverage.xml'])
              junit 'junit.xml'
            }
          }
        }

        stage('build application') {
          steps {
            sh 'CI=false yarn build'
          }
        }

        stage('make artifact') {
          steps {
            archiveArtifacts artifacts: "${BUILD_DIR}/**/*", fingerprint: true
          }
        }
      }
    }

    stage('creating bizcase-api docker image') {
      when {
        branch BUILD_BRANCH
      }
      stages {
        stage('build docker image') {
          steps {
            copyArtifacts filter: "${BUILD_DIR}/**/*", fingerprintArtifacts: true, projectName: '${JOB_NAME}', selector: specific('${BUILD_NUMBER}')

            script {
              docker.withServer("ssh://ec2-user@54.88.176.131") {
                docker.build("visavis/bizcase-api:latest")
              }
            }
          }
        }

        // Since host shared docker.socks with jenkins, doing compose is fine in this case
        stage('docker-compose to remote server') {
          steps {
            withEnv(["DOCKER_HOST=ssh://ec2-user@54.88.176.131"]) {
              sh("DATABASE_PASSWORD='$DATABASE_PASSWORD' DATABASE_USERNAME='$DATABASE_USERNAME' docker-compose -p bizcase-api up -d --remove-orphans")
            }
          }
        }
      }
    }
  }

  post {
    failure {
      bitbucketStatusNotify ( buildState: 'FAILED' )

      script {
        GIT_COMMIT_SHA = sh(returnStdout: true, script: 'git rev-parse HEAD')
        GIT_COMMIT_AUTHOR = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' $GIT_COMMIT_SHA").trim()
        GIT_DESC = sh(returnStdout: true, script: 'git log --format="commit %H%nauthor %an <%aE>%n%n%B" -1').trim()
      }
      slackSend (color: '#ff0000', channel: "capbizcase", message: "*$JOB_NAME #$BUILD_NUMBER deploy FAILURE!*\n\n```$GIT_DESC```\n:point_right: <$BUILD_URL|$JOB_NAME>")
    }
    success {
      bitbucketStatusNotify ( buildState: 'SUCCESSFUL' )

      script {
        GIT_COMMIT_SHA = sh(returnStdout: true, script: 'git rev-parse HEAD')
        GIT_COMMIT_AUTHOR = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' $GIT_COMMIT_SHA").trim()
        GIT_DESC = sh(returnStdout: true, script: 'git log --format="commit %H%nauthor %an <%aE>%n%n%B" -1').trim()
      }
      slackSend (color: '#BDFFC3', channel: "capbizcase", message: "*$JOB_NAME #$BUILD_NUMBER deploy done!*\n\n```$GIT_DESC```\n:point_right: <$BUILD_URL|$JOB_NAME>")
    }
  }
}
