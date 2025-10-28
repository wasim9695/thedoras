// lib/apiClient.js (or services/api.js)

// Use process.env.NEXT_PUBLIC_API_BASE_URL for client-side accessible variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Fallback to /api if not set

async function fetchJson(path: string, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Attempt to parse error message from response body
      const errorData = await response.json().catch(() => ({ message: 'Unknown API error' }));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    // Handle cases where the response might be empty (e.g., DELETE requests)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    // If not JSON, return text or handle other content types as needed
    return response.text();
  } catch (error) {
    console.error(`API call to ${url} failed:`, error);
    throw error; // Re-throw to allow calling code to handle
  }
}

// --- New signIn function for your login API ---
/**
 * Calls the /signIn API endpoint to authenticate a user.
 * @param {object} credentials - An object containing user credentials (e.g., { email, password }).
 * @returns {Promise<any>} - A promise that resolves to the API response (e.g., user token, user data).
 */
export const signIn = (credentials: object) => fetchJson('/signIn', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials),
});