export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '3000',
    endpoints: {
      allUsers: '/users',
      oneUser: '/users/:id',
      allQuestions: '/questions',
      oneQuestion: '/questions/:id',
      allTags: '/tags',
      oneTag: '/tags/:name',
      quizzes:'/quizzes'
    }

  }
};
