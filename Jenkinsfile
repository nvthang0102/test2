pipeline {
    agent any
    tools {nodejs 'nodejs'}
    stages {
        stage('Checkout') {
            steps {
                // Lấy source code từ Git
                git branch: 'master', url: 'https://github.com/nvthang0102/test2.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install --force'
                }
            }
        }

        stage('Build') {
            steps {
                // Chạy lệnh build với npm
                script {
                    sh 'npm run build'
                }
            }
        }


        // stage('Deploy') {
        //     steps {
        //         // Bước deploy (tùy theo yêu cầu của bạn)
        //         echo 'Deploying application...'
        //     }
        // }
    }

    post {
        always {
            // Luôn dọn dẹp workspace sau khi hoàn thành build
            cleanWs()
        }
        success {
            echo 'Build was successful!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
