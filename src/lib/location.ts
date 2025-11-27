/**
 * Detects the user's country code using client-side IP detection.
 * This runs entirely in the browser, bypassing server-side proxy/NAT issues.
 * Returns null silently if detection fails (e.g., localhost, blocked, etc.)
 */
export async function detectUserCountry(): Promise<string | null> {
  // Skip on localhost/development - these APIs won't work properly
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return null;
  }

  // 1. Try ipapi.co (Primary)
  try {
    const res = await fetch('https://ipapi.co/json/', { 
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    if (res.ok) {
      const data = await res.json();
      if (data.country_code) {
        return data.country_code;
      }
    }
  } catch {
    // Silently fail, try fallback
  }

  // 2. Fallback to ipwho.is
  try {
    const res = await fetch('https://ipwho.is/', {
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.country_code) {
        return data.country_code;
      }
    }
  } catch {
    // Silently fail
  }

  return null;
}
