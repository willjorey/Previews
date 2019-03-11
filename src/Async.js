import {AsyncStorage } from 'react-native';
export default class Async{
    constructor(){

    }
    storeProfile = async (profile, uid) => {
        try {
          return await AsyncStorage.setItem(uid, JSON.stringify(profile));
        } catch (error) {
          // Error saving data
          console.log(error)
        }
    };
    getProfile = async (key) =>{
        try{
            let res = await AsyncStorage.getItem(key);
            return JSON.parse(res);
        }catch(error){
            console.log(error.message);
        }
    };
    removeProfile = async (key) => {
        try {
          return await AsyncStorage.removeItem(key);
        } catch (error) {
          // Error saving data
        }
    };

}