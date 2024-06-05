pipeline {
    agent any

     environment {
         registry = "syednouman1618/scd-final"
        DOCKER_CREDENTIALS ='syednouman1618-dockerhub'
        dockerImage = ''
    }

    stages {
        stage('21i-1172 Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        stage('21i-1172 Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub
                    docker.withRegistry('', DOCKER_CREDENTIALS) {
                        // Push the built image to Docker Hub
                        dockerImage.push()
                    }
                }
            }
        }

        stage('21i-1172 Deploy') {
            steps {
                script {
                    // Deploy using Docker Compose
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            // Cleanup
            script {
                // Stop and remove containers after use
                sh 'docker-compose down'
            }
        }
    }
}