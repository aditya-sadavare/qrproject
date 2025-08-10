@Library('Shared') _

pipeline {
    agent { label 'agent1' }

    stages {
        stage('Pipeline') {
            steps {
                script {
                    pull()
                    build()
                    deploy()
                }
            }
        }
    }
}
