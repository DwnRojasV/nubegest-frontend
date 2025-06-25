const awsExports = {
  Auth: {
    region: 'us-east-1', // reemplaza con tu región real
    userPoolId: 'us-east-1_xpbgmyb4s', // tu Cognito User Pool ID
    userPoolWebClientId: '13cepon5kgconq6dmsaqcr5ubj', // tu App Client ID
    oauth: {
      domain: 'us-east-1xpbgmyb4s.auth.us-east-1.amazoncognito.com', // tu dominio del Hosted UI
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'http://localhost:4200/callback', // debe coincidir con Cognito
      redirectSignOut: 'http://localhost:4200/logout',
      responseType: 'code'
    }
  }
};

export default awsExports as any;