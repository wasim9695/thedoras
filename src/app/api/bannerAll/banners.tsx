// lib/apiClient.js (or services/api.js)

// Use process.env.NEXT_PUBLIC_API_BASE_URL for client-side accessible variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Fallback to localhost:9000 if not set

async function fetchJson(path: string, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown API error' }));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  } catch (error) {
    console.error(`API call to ${url} failed:`, error);
    throw error;
  }
}

/**
 * Fetches the left banner from the /common/leftbanner endpoint.
 * @returns {Promise<any>} - A promise that resolves to the banner data.
 */
export const fetchLeftBanner = (): Promise<any> => fetchJson('/common/leftbanner', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchRightBanner = (): Promise<any> => fetchJson('/common/rightbanner', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
});
export const fetchBottomBanner = (): Promise<any> => fetchJson('/common/bottombanner', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
});
export const fetchBottomTwoBanner = (): Promise<any> => fetchJson('/common/bottombannerTwo', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
});
