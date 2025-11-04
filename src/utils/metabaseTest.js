import { generateMetabaseDashboardURL } from '../services/metabaseService.js';

/**
 * Test utility to validate Metabase URL generation
 */
export const testMetabaseIntegration = async () => {
  try {
    console.log('Testing Metabase integration...');
    
    // Test basic dashboard URL generation
    const dashboardUrl = await generateMetabaseDashboardURL();
    console.log('✅ Dashboard URL generated successfully');
    console.log('URL:', dashboardUrl);
    
    // Test with custom parameters
    const customUrl = await generateMetabaseDashboardURL(2, { param1: 'value1' }, 60);
    console.log('✅ Custom dashboard URL generated successfully');
    console.log('Custom URL:', customUrl);
    
    // Test token structure
    const urlParts = dashboardUrl.split('/embed/dashboard/');
    if (urlParts.length === 2) {
      const tokenPart = urlParts[1].split('#')[0];
      console.log('✅ Token structure is valid');
      console.log('Token preview:', tokenPart.substring(0, 50) + '...');
    }
    
    return {
      success: true,
      dashboardUrl,
      customUrl
    };
    
  } catch (error) {
    console.error('❌ Metabase integration test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Validate environment configuration
 */
export const validateMetabaseConfig = () => {
  const siteUrl = import.meta.env.VITE_METABASE_SITE_URL;
  const secretKey = import.meta.env.VITE_METABASE_SECRET_KEY;
  
  const issues = [];
  
  if (!siteUrl) {
    issues.push('VITE_METABASE_SITE_URL is not set');
  } else if (!siteUrl.startsWith('http')) {
    issues.push('VITE_METABASE_SITE_URL should start with http:// or https://');
  }
  
  if (!secretKey) {
    issues.push('VITE_METABASE_SECRET_KEY is not set');
  } else if (secretKey.length < 32) {
    issues.push('VITE_METABASE_SECRET_KEY seems too short');
  }
  
  if (issues.length === 0) {
    console.log('✅ Metabase configuration is valid');
    return { valid: true };
  } else {
    console.error('❌ Metabase configuration issues:', issues);
    return { valid: false, issues };
  }
};