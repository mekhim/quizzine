export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '3000',
    endpoints: {
      allUsers: '/users',
      oneUserId: '/users/id/:id',
      oneUserName: '/users/username/:username',
      allQuestions: '/questions',
      oneQuestion: '/questions/:id',
      allTags: '/tags',
      oneTag: '/tags/:name',
      quizzes:'/quizzes',
      register: '/auth/register',
      login: '/auth/login'
    }

  }
};
