pipeline {
    agent any

    tools {
        nodejs 'nodejs-18'
    }

    environment {
        DOCKER_HUB = credentials('docker-hub-creds')
        VERSION    = "${env.BUILD_ID}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/mcode123-commits/food-delivery-ui.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci --force'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'npm run build --prod'
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh '''
                    echo "$DOCKER_HUB_PSW" | docker login -u "$DOCKER_HUB_USR" --password-stdin

                    docker build -t mankusmichal/food-delivery-ui:${VERSION} .
                    docker push mankusmichal/food-delivery-ui:${VERSION}
                '''
            }
        }

        stage('Update GitOps Manifest') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[
                        url: 'git@github.com:mcode123-commits/deployment.git',
                        credentialsId: 'git-ssh'
                    ]]
                ])

                script {
                    sh """
                        sed -i "s|image:.*|image: mankusmichal/food-delivery-ui:${VERSION}|" aws/angular-manifest.yml
                    """

                    sh '''
                        git config user.name "Jenkins"
                        git config user.email "jenkins@example.com"
                        git add .
                        git commit -m "Update Angular image to version '${VERSION}'" || echo "No changes"
                    '''

                    sshagent(credentials: ['git-ssh']) {
                        sh '''
                            git checkout -B master
                            git push origin master
                        '''
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                deleteDir()
            }
        }
    }
}
