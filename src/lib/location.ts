/**
 * Detects the user's country code using client-side IP detection.
 * This runs entirely in the browser, bypassing server-side proxy/NAT issues.
 */
export async function detectUserCountry(): Promise<string | null> {
  try {
    // 1. Try ipapi.co (Primary)
    // It's free, fast, and reliable for client-side requests
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      if (data.country_code) {
        console.log(`[Location] Detected country: ${data.country_code}`);
        return data.country_code;
      }
    }

    // 2. Fallback to ipwho.is if primary fails
    // Also free and doesn't require an API key
    const fallbackRes = await fetch('https://ipwho.is/');
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      if (data.success && data.country_code) {
        console.log(`[Location] Fallback detected country: ${data.country_code}`);
        return data.country_code;
      }
    }

    return null;
  } catch (error) {
    console.error("[Location] Failed to detect country:", error);
    return null;
  }
}


