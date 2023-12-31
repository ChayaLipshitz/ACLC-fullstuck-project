pipeline{
    agent any
    stages {
        stage('Build') {
            steps 
            {
                script {
                    // Get commit message and use it as the tag
                    def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    def dockerTag = commitMessage.replaceAll("[^a-zA-Z0-9]", "_")
                    // Build Docker image with the commit message as the tag
                    // sh 'docker ps'
                    // sh 'docker stop ACLC'
                    // sh 'docker rm ACLC'
                    // sh "docker build --tag ACLC:${dockerTag} ."
                    sh "ls"
                    sh "docker-compose up"
                }
            }
        }
    //     stage('Build') {
    //         steps {
    //             script {
    //                 // Get commit message and use it as the tag
    //                 def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
    //                 def dockerTag = commitMessage.replaceAll("[^a-zA-Z0-9]", "_")
    //                 // Build Docker image with the commit message as the tag
    //                 sh 'docker ps'
    //                 sh 'docker stop dev_connect'
    //                 sh 'docker rm dev_connect'
    //                 sh "docker build --tag dev_connect:${dockerTag} ."
    //             }
    //         }
    //     }
    //     stage('Run') {
    //         steps {
    //             // Run Docker container
    //             sh 'docker run -p 5000:5000 --name dev_connect -d -v dev_connect_data:/usr/src/app dev_connect:${dockerTag}'
    //         }
    //     }
    //     stage('Test') {
    //       steps {
    //         script {
    //                 // Run Django tests
    //                 def testResult = sh(script: 'docker exec dev_connect python django_web_app/manage.py test', returnStatus: true)

    //                 // Check for 200 OK response
    //                 if (testResult == 0) {
    //                     echo 'Tests passed!'
    //                 } else {
    //                     error 'Tests failed! Build aborted.'
    //                 }
    //             }      
    //       }
    //     }
    //     stage('Push') {
    //         steps {
    //             sh 'gcloud auth configure-docker us-west1-docker.pkg.dev'
    //             sh 'docker tag dev_connect:${dockerTag} us-west1-docker.pkg.dev/devconnect-project/chaya-lipshitz-artifacts/dev_connect:${dockerTag}'
    //             sh 'docker push us-west1-docker.pkg.dev/devconnect-project/chaya-lipshitz-artifacts/dev_connect:${dockerTag}'
    //         }
    //     }
    //     // stage('Deploy to Production') {
    //     //     when {
    //     //         expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
    //     //     }
    //     //     steps {
    //     //         script {
    //     //             def kubectlCommand = """
    //     //                 kubectl --kubeconfig=/path/to/your/kubeconfig.yml
    //     //                 --namespace=production
    //     //                 set image deployment/dev-connect-deployment
    //     //                 dev-connect-container=us-west1-docker.pkg.dev/devconnect-project/chaya-lipshitz-artifacts/dev_connect:${dockerTag}
    //     //             """
    //     //             sh kubectlCommand.trim()
    //     //         }
    //     //     }
    //     // }
    // }

    // post {
    //     always {
    //         sh 'docker stop dev_connect || true'
    //         sh 'docker rm dev_connect || true'
    //         sh 'docker logout'  
    //     }
    // }
}