// lib/apiClient.ts

// Use process.env.NEXT_PUBLIC_API_BASE_URL for client-side accessible variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  // First try to get token from localStorage (client-side)
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  // Fallback to environment variable for server-side
  return process.env.AUTH_TOKEN || null; // Removed NEXT_PUBLIC_ prefix as auth tokens shouldn't be public
};

async function fetchJson(path: string, options: RequestInit = {}) {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined');
  }

  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  
  // Add auth token to headers if it exists
  const authToken = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
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
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    return response.text();
  } catch (error) {
    console.error(`API call to ${url} failed:`, error);
    throw error;
  }
}

/**
 * Fetches all products from the /getTodayDeal endpoint.
 * @returns {Promise<any>} - A promise that resolves to the products data.
 */
export const fetchProductsAll = () =>
  fetchJson('/getTodayDeal', {
    method: 'GET',
  });


  export const fetchProductsAllNewAr = () =>
  fetchJson('/getTodayNewArrivals', {
    method: 'GET',
  });
/**
 * Fetches cart details from the /getCartDetails endpoint.
 * @returns {Promise<any>} - A promise that resolves to the cart data.
 */
export const fetchCartsAll = () =>
  fetchJson('/getCartDetails', {
    method: 'GET',
  });

/**
 * Adds an item to the cart via the /addToCart endpoint.
 * @param data - The data to send with the request.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 */
export const fetchAddToCart = (data: object) =>
  fetchJson('/addToCart', {
    method: 'POST', // Changed to POST as adding to cart typically modifies server state
    body: JSON.stringify(data),
  });


  export const fetchProductListDetail = (data: object) =>
  fetchJson(`/getProductListDetail/${data}`, {
    method: 'GET', // Changed to POST as adding to cart typically modifies server state
  });


  export const fetchSingleUpdate = (data: object) =>
  fetchJson('/singleupdate/', {
    method: 'POST', // Changed to POST as adding to cart typically modifies server state
    body: JSON.stringify(data),
  });

  export const fetchDeletes = (data: object) =>
  fetchJson('/deleteCartProducts/', {
    method: 'POST', // Changed to POST as adding to cart typically modifies server state
    body: JSON.stringify(data),
  });




  