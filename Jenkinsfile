@Library('Shared') _

pipeline {
    agent { label 'agent1' }

    stages {
        stage('Pipeline') {
            steps {
                script {
                    pull('https://github.com/aditya-sadavare/qrproject', 'main')
                   def changedFiles = sh(script: "git diff --name-only HEAD~1 HEAD", returnStdout: true).trim()

                   
                    if (changedFiles) {
                        changedFiles = changedFiles.split('\n').toList()
                    } else {
                        changedFiles = []
                    }
                    
                    build(changedFiles)


                    deploy()
                }
            }
        }
    }
}
