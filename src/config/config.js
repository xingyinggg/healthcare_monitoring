// Environment detection and redirect URI logic
const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '0.0.0.0'
);

// Get redirect URIs from environment variables 
const localRedirectUri = import.meta.env.VITE_AUTH_REDIRECT_URI;
const productionRedirectUri = import.meta.env.VITE_REDIRECT_URI;
const localLogoutUri = import.meta.env.VITE_AUTH_LOGOUT_URI;
const productionLogoutUri = import.meta.env.VITE_LOGOUT_URI;

// Debug logging for both development AND production (for troubleshooting)
const debugConfig = {
    isLocalhost,
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'server-side',
    localRedirectUri,
    productionRedirectUri,
    localLogoutUri,
    productionLogoutUri,
    selectedRedirectUri: isLocalhost ? localRedirectUri : productionRedirectUri,
    selectedLogoutUri: isLocalhost ? (localLogoutUri || localRedirectUri) : (productionLogoutUri || productionRedirectUri)
};

// Always log in development, and also log in production if there are issues
if (import.meta.env.DEV || !localRedirectUri || !productionRedirectUri) {
    console.log('🔧 Config Debug:', debugConfig);
}

// Validate environment variables
if (!localRedirectUri || !productionRedirectUri) {
    console.error('❌ Missing required environment variables:');
    if (!localRedirectUri) console.error('  - VITE_AUTH_REDIRECT_URI is missing');
    if (!productionRedirectUri) console.error('  - VITE_REDIRECT_URI is missing');
    throw new Error('Required redirect URI environment variables are not configured');
}

const redirectUri = isLocalhost ? localRedirectUri : productionRedirectUri;
const logoutUri = isLocalhost ? (localLogoutUri || localRedirectUri) : (productionLogoutUri || productionRedirectUri);

// Additional logging to help debug production issues
if (typeof window !== 'undefined') {
    console.log('🌐 Final Auth Config:', {
        environment: isLocalhost ? 'localhost' : 'production',
        hostname: window.location.hostname,
        redirectUri,
        logoutUri,
        userPoolId: import.meta.env.VITE_USER_POOL_ID,
        oidcAuthority: import.meta.env.VITE_OIDC_AUTHORITY
    });
}

// Metabase configuration
export const metabaseConfig = {
    siteUrl: import.meta.env.VITE_METABASE_SITE_URL,
    secretKey: import.meta.env.VITE_METABASE_SECRET_KEY,
    publicDashboardUrl: import.meta.env.VITE_METABASE_PUBLIC_DASHBOARD_URL,
    defaultDashboardId: 2,
    defaultExpirationMinutes: 30,
    refreshIntervalMinutes: 25
};

// Validate Metabase configuration - also log in production if there are issues
if (import.meta.env.DEV || !metabaseConfig.publicDashboardUrl) {
    if (!metabaseConfig.publicDashboardUrl) {
        console.error('❌ Missing Metabase environment variables:');
        console.error('  - VITE_METABASE_PUBLIC_DASHBOARD_URL is missing');
    } else if (import.meta.env.DEV) {
        console.log('✅ Metabase public dashboard configuration loaded from environment variables');
        console.log('📊 Dashboard URL:', metabaseConfig.publicDashboardUrl);
    }
}

// AWS Cognito configuration
export const cognitoConfig = {
    region: import.meta.env.VITE_AWS_REGION,
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    cognitoDomain: import.meta.env.VITE_COGNITO_DOMAIN,
    oauthDomain: import.meta.env.VITE_OAUTH_DOMAIN,
    redirectUri: redirectUri,
    logoutUri: logoutUri || redirectUri,
    authRedirectUri: redirectUri,
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID
};

// AWS Amplify Configuration
export const awsConfig = {
    auth: {
        user_pool_id: import.meta.env.VITE_USER_POOL_ID,
        user_pool_client_id: import.meta.env.VITE_USER_POOL_CLIENT_ID,
        identity_pool_id: import.meta.env.VITE_IDENTITY_POOL_ID || "", // Optional
        oauth: {
            domain: import.meta.env.VITE_OAUTH_DOMAIN,
            scope: ["openid", "email", "profile"],
            redirectSignIn: redirectUri,
            redirectSignOut: redirectUri,
            responseType: "code",
        },
    },
};

// OIDC Configuration for react-oidc-context
export const oidcConfig = {
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: import.meta.env.VITE_OIDC_SCOPE,
    post_logout_redirect_uri: redirectUri,
    automaticSilentRenew: true,
    loadUserInfo: true,
};