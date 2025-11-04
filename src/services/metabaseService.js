import { SignJWT } from 'jose';
import { metabaseConfig } from '../config/config.js';

/**
 * Generates a signed URL for Metabase dashboard embedding
 * @param {number} dashboardId - The ID of the dashboard to embed
 * @param {Object} params - Additional parameters for the dashboard
 * @param {number} expirationMinutes - Token expiration time in minutes (default: 30)
 * @returns {Promise<string>} The signed iframe URL
 */
export const generateMetabaseDashboardURL = async (
  dashboardId = metabaseConfig.defaultDashboardId, 
  params = {}, 
  expirationMinutes = metabaseConfig.defaultExpirationMinutes
) => {
  try {
    const payload = {
      resource: { dashboard: dashboardId },
      params: params,
      exp: Math.round(Date.now() / 1000) + (expirationMinutes * 60)
    };

    // Convert secret key to Uint8Array for jose
    const secret = new TextEncoder().encode(metabaseConfig.secretKey);
    
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(payload.exp)
      .sign(secret);
    
    const iframeUrl = `${metabaseConfig.siteUrl}/embed/dashboard/${token}#bordered=true&titled=true`;
    
    return iframeUrl;
  } catch (error) {
    console.error('Error generating Metabase URL:', error);
    throw new Error('Failed to generate Metabase dashboard URL');
  }
};

/**
 * Generates a signed URL for Metabase question/chart embedding
 * @param {number} questionId - The ID of the question to embed
 * @param {Object} params - Additional parameters for the question
 * @param {number} expirationMinutes - Token expiration time in minutes (default: 10)
 * @returns {Promise<string>} The signed iframe URL
 */
export const generateMetabaseQuestionURL = async (questionId, params = {}, expirationMinutes = 10) => {
  try {
    const payload = {
      resource: { question: questionId },
      params: params,
      exp: Math.round(Date.now() / 1000) + (expirationMinutes * 60)
    };

    // Convert secret key to Uint8Array for jose
    const secret = new TextEncoder().encode(metabaseConfig.secretKey);
    
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(payload.exp)
      .sign(secret);
    
    const iframeUrl = `${metabaseConfig.siteUrl}/embed/question/${token}#bordered=true&titled=true`;
    
    return iframeUrl;
  } catch (error) {
    console.error('Error generating Metabase question URL:', error);
    throw new Error('Failed to generate Metabase question URL');
  }
};