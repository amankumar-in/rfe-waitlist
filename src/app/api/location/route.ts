import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // 1. Get user IP from headers (standard proxy headers)
    const forwarded = request.headers.get("x-forwarded-for");
    let ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip");
    
    console.log(`[Location API] Detected IP: ${ip}`);

    // Helper to fetch from ipapi.co
    const fetchIpapi = async (targetIp: string | null) => {
      let url = 'https://ipapi.co/json/';
      // Check if IP is private/local/null
      const isLocal = !targetIp || targetIp === '::1' || targetIp === '127.0.0.1' || targetIp.startsWith('192.168.') || targetIp.startsWith('10.');
      
      if (!isLocal && targetIp) {
        url = `https://ipapi.co/${targetIp}/json/`;
      }
      
      console.log(`[Location API] Trying ipapi.co with URL: ${url}`);
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        return data.country_code;
      }
      throw new Error(`ipapi.co failed: ${res.status}`);
    };

    // Helper to fetch from ipwho.is (Fallback)
    const fetchIpwhois = async (targetIp: string | null) => {
      let url = 'https://ipwho.is/'; // Returns requester IP info
      
       // Check if IP is private/local/null
      const isLocal = !targetIp || targetIp === '::1' || targetIp === '127.0.0.1' || targetIp.startsWith('192.168.') || targetIp.startsWith('10.');

      if (!isLocal && targetIp) {
        url = `https://ipwho.is/${targetIp}`;
      }

      console.log(`[Location API] Trying ipwho.is with URL: ${url}`);
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          return data.country_code;
        }
      }
      throw new Error(`ipwho.is failed or success=false`);
    };

    // Try primary provider
    try {
      const country = await fetchIpapi(ip);
      if (country) {
        console.log(`[Location API] Success with ipapi.co: ${country}`);
        return NextResponse.json({ country });
      }
    } catch (e) {
      console.warn("[Location API] ipapi.co failed, trying fallback...", e);
    }

    // Try fallback provider
    try {
      const country = await fetchIpwhois(ip);
      if (country) {
        console.log(`[Location API] Success with ipwho.is: ${country}`);
        return NextResponse.json({ country });
      }
    } catch (e) {
      console.error("[Location API] ipwho.is failed", e);
    }

    return NextResponse.json({ country: null });
  } catch (error) {
    console.error("Error detecting location:", error);
    return NextResponse.json({ country: null }, { status: 500 });
  }
}
