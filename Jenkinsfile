pipeline {
  agent any
  stages {
    stage('Checkout Repo') {
      steps {
        git(url: 'https://github.com/nomankhan669/reactjs-yts-movies', branch: 'master')
      }
    }

    stage('Build ') {
      steps {
        sh 'docker build -f Dockerfile .'
      }
    }

  }
}