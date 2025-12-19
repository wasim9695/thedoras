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
export const fetchGetProfileDetails = () =>
  fetchJson('/getUserProfile', {
    method: 'GET',
  });

  export const fetchGetFetchDetails = () =>
  fetchJson('/getuserAddr', {
    method: 'GET',
  });

  export const aaddNewAddressHere = (data: any) =>{
    console.log("data in api",data);
  fetchJson(`/users/addresses`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


  

  export const fetchLogout = () =>
  fetchJson('/logOut', {
    method: 'GET',
  });

  





  