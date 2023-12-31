pipeline{
    agent any
    stages {
        stage('Build') {
            steps 
            {
                script {
                    // Get commit message and use it as the tag
                    // def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    // def dockerTag = commitMessage.replaceAll("[^a-zA-Z0-9]", "_")
                    sh "ls"
                    // sh "docker-compose up"
                    sh "docker-compose up -d --no-deps --build"
                    // sh "docker-compose up -d --no-deps --build <service_name>"
                    // sh "docker-compose up -d --no-deps --build <service_name>" 
                }
            }
        }
    }
}