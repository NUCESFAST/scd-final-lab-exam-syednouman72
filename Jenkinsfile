pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/NUCESFAST/scd-final-lab-exam-syednouman72.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Or whatever command you use to install dependencies
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('your-dockerhub-username/your-image-name')
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image('your-dockerhub-username/your-image-name').push('latest')
                    }
                }
            }
        }
        stage('Deploy and Test') {
            steps {
                // Deploy the Docker image and test the application
                // Ensure seamless communication between containers
            }
        }
    }
}
