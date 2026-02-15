pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // the NodeJS tool you configured in Jenkins
    }
    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages and Playwright browsers...'
                bat 'npm install'
                bat 'npx playwright install'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests...'
                bat 'npx playwright test --reporter=html'
            }
        }
        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }
    post {
        always {
            echo 'Test run completed'
        }
    }
}
