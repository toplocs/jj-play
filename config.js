module.exports = {
  // Default configuration for using the internal IDP
  useExternalIDP: false,
  externalIDPUrl: 'https://external-idp.com',
  secretKey: 'your_secret_key',

  // Example configuration for using the external IDP
  externalIDPConfig: {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    authorizationUrl: 'https://external-idp.com/authorize',
    tokenUrl: 'https://external-idp.com/token',
    userInfoUrl: 'https://external-idp.com/userinfo',
    redirectUri: 'http://localhost:4000/callback'
  }
};
