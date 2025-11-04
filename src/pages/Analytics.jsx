import { useEffect, useState } from "react";
import { generateMetabaseDashboardURL } from "../services/metabaseService";
import { metabaseConfig } from "../config/config";

export default function Analytics() {
  const [dashboardUrl, setDashboardUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Generate signed URL with configuration defaults (now async)
        const signedUrl = await generateMetabaseDashboardURL();
        setDashboardUrl(signedUrl);
      } catch (err) {
        console.error('Failed to generate Metabase dashboard URL:', err);
        setError('Failed to load analytics dashboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    // Refresh the URL periodically to prevent expiration
    const refreshInterval = setInterval(loadDashboard, metabaseConfig.refreshIntervalMinutes * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[90vh] p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[90vh] p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <div className="text-red-600 mb-2">⚠️ Error</div>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[90vh] p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Healthcare Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Real-time insights and metrics</p>
        </div>
        
        <div className="h-[calc(100%-4rem)]">
          <iframe
            src={dashboardUrl}
            title="Healthcare Analytics Dashboard"
            frameBorder="0"
            width="100%"
            height="100%"
            allow="clipboard-read; clipboard-write"
            allowTransparency
            loading="eager"
            className="rounded-b-lg"
          />
        </div>
      </div>
    </div>
  );
}
