import { useEffect, useState } from "react";

export default function Analytics() {
  const [ready, setReady] = useState(false);

  // REPLACE with your HTTPS Metabase public share URL
  const PUBLIC_METABASE_URL =
    "http://18.141.236.13:3000/public/dashboard/3bf4a63a-1115-454d-8c44-d48a389bb11d";

  useEffect(() => setReady(true), []);

  return (
    <div className="w-full h-[90vh] p-4">
      {ready ? (
        <iframe
          src={PUBLIC_METABASE_URL}
          title="Metabase Dashboard"
          frameBorder="0"
          width="100%"
          height="100%"
          allow="clipboard-read; clipboard-write"
          allowTransparency
          loading="eager"
        />
      ) : (
        <p>Loading dashboard…</p>
      )}
    </div>
  );
}
