@Library('Shared') _

pipeline {
    agent { label 'agent1' }

    stages {
        stage('Pipeline') {
            steps {
                script {
                    pull('https://github.com/aditya-sadavare/qrproject', 'main')

                   def changedFiles = sh(script: "git diff --name-only HEAD~1 HEAD", returnStdout: true).trim()

                    // If empty, make sure to handle it:
                    if (changedFiles) {
                        changedFiles = changedFiles.split('\n').toList()
                    } else {
                        changedFiles = []
                    }
                    
                    // Now call your shared lib function with List:
                    build(changedFiles)


                    deploy()
                }
            }
        }
    }
}
