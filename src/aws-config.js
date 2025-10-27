// AWS Amplify Configuration
// This configuration can be used for future Amplify integration

export const awsConfig = {
  auth: {
    user_pool_id: "ap-southeast-1_GbZwjb0A5",
    user_pool_client_id: "1f8p38gkthak9ui5dvrkp53k7q",
    identity_pool_id: "", // Optional - add if you create an Identity Pool
    oauth: {
      domain: "ap-southeast-1gbzwjb0a5.auth.ap-southeast-1.amazoncognito.com",
      scope: ["openid", "email", "profile"],
      redirectSignIn: "https://staging.dwbsrj9watu1s.amplifyapp.com/",
      redirectSignOut: "https://staging.dwbsrj9watu1s.amplifyapp.com/",
      responseType: "code"
    }
  }
};

// OIDC Configuration for react-oidc-context
export const oidcConfig = {
  authority: "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_GbZwjb0A5",
  client_id: "1f8p38gkthak9ui5dvrkp53k7q",
  redirect_uri: "https://staging.dwbsrj9watu1s.amplifyapp.com/",
  response_type: "code",
  scope: "openid email profile",
  post_logout_redirect_uri: "https://staging.dwbsrj9watu1s.amplifyapp.com/",
  automaticSilentRenew: true,
  loadUserInfo: true,
};