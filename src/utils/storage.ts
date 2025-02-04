export const loadUserData = (): UserData | null => {
  try {
    const data = localStorage.getItem('userData');
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    if (!parsed.id || !parsed.name) throw new Error('Invalid data format');
    
    return parsed;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

export const saveUserData = (data: UserData): void => {
  try {
    localStorage.setItem('userData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving user data:', error);
    throw new Error('Storage is full or unavailable');
  }
};	