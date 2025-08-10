pipeline {
    agent { label 'agent1' }

    stages {
        stage('Pull') {
            steps {
                git url: 'https://github.com/aditya-sadavare/qrproject', branch: 'main'
                echo 'pulled'
            }
        }

        stage('Stop Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build --no-cache --pull'
            }
        }

        stage('Start Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}
