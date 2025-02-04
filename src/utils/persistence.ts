export const testLocalStorage = (): boolean => {
  try {
    const testKey = 'react_app_test';
    localStorage.setItem(testKey, testKey); // Attempt to store a test item
    localStorage.removeItem(testKey); // Attempt to remove the test item
    return true; // If no error occurred, localStorage is available
  } catch (e) {
    console.error('LocalStorage not available:', e); // Log any errors encountered
    return false; // Return false if localStorage is unavailable
  }
};
