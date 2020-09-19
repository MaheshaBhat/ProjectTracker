import * as SecureStore from 'expo-secure-store';

export const _storeData = async (key:string, value:any) => {
    try {
        //await AsyncStorage.setItem(key, value);
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        // Error saving data
    }
};
export const _retrieveData = async (key:string) => {
    try {
        //const value = await AsyncStorage.getItem(key);
        const value = await SecureStore.getItemAsync(key);


        return value;
    } catch (error) {
        return null;
    }
};
