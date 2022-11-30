pipeline {
  agent any
  stages {
    stage('Checkout Repo') {
      steps {
        git(url: 'https://github.com/nomankhan669/reactjs-yts-movies', branch: 'master')
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'nvm use 10.24.1 && node -v && npm install'
      }
    }

  }
}