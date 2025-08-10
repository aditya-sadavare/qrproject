pipeline {
    agent { label 'agent1' }

    stages {
        stage('Pull Code') {
            steps {
                echo 'Pulling latest code from GitHub...'
                sh 'git clone --branch main https://github.com/aditya-sadavare/qrproject .'
                echo 'Code pulled successfully.'
            }
        }

        stage('Stop Containers') {
            steps {
                echo 'Stopping and removing old containers...'
                sh 'docker compose down'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building fresh Docker images...'
                sh 'docker compose build --no-cache --pull'
                echo 'Docker images built successfully.'
            }
        }

        stage('Start Containers') {
            steps {
                echo 'Starting new containers...'
                sh 'docker compose up -d'
                echo 'Containers started successfully.'
            }
        }
    }
}
