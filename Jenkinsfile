pipeline {
    agent any

    tools {
        nodejs 'NodeJS' 
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
                echo 'Archiving Playwright HTML report...'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }

    post {
        always {
            echo 'Test run completed'
        }
    }
}
