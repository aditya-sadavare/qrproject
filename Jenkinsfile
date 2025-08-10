pipeline {
    agent { label 'agent1' }

    stages {
        stage('Pull Code') {
            steps {
                git url: 'https://github.com/aditya-sadavare/qrproject', branch: 'main'
                echo 'Pulled latest code from GitHub'
            }
        }

        stage('Build Changed Services') {
            steps {
                script {
                    def changedFiles = sh(script: "git diff --name-only HEAD~1 HEAD", returnStdout: true).trim()

                    if (changedFiles.contains("qrFrontend/")) {
                        echo "Frontend code changed → rebuilding frontend"
                        sh 'docker compose build frontend'
                    } else {
                        echo "No frontend changes → skipping rebuild"
                    }

                    if (changedFiles.contains("qrServer/")) {
                        echo "Backend code changed → rebuilding backend"
                        sh 'docker compose build backend'
                    } else {
                        echo "No backend changes → skipping rebuild"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}
