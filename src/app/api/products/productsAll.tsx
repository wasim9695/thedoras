// lib/apiClient.ts

// Use process.env.NEXT_PUBLIC_API_BASE_URL for client-side accessible variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to get auth token
const getAuthToken = (): string | null => {
  // First try to get token from localStorage (client-side)
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  // Fallback to environment variable for server-side
  return process.env.NEXT_PUBLIC_AUTH_TOKEN || null;
};

async function fetchJson(path: string, options: RequestInit = {}): Promise<any> {
  const url = `${API_BASE_URL}${path}`;
  
  // Add auth token to headers if it exists
  const authToken = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

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
export const fetchProductsAll = (): Promise<any> => fetchJson('/getTodayDeal', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Fetches cart details from the /getCartDetails endpoint.
 * @returns {Promise<any>} - A promise that resolves to the cart data.
 */
export const fetchCartsAll = (): Promise<any> => fetchJson('/getCartDetails', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
});


