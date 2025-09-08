import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save item to AsyncStorage
 * @param {string} key
 * @param {any} value
 */
export const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
};

/**
 * Get item from AsyncStorage
 * @param {string} key
 * @returns {any|null}
 */
export const getItem = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return null;
  }
};

/**
 * Remove item from AsyncStorage
 * @param {string} key
 */
export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from storage:`, error);
  }
};

/**
 * Clear all storage
 */
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};
