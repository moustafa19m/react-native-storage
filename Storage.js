import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';

export default Storage = (() => {
  const storage = {};

  const useStorage = (defaultValue, tag, onFinished) => {
    // captures saved state if it exists
    // if not get it from async storage
    // if it doesn't exist in async storage, set it to default value

    const [value, setValue] = React.useState(
      storage[tag] !== undefined? storage[tag]: defaultValue,
    );

    useEffect(() => {
      // AsyncStorage.clear();
      let item = undefined;
      const loadValue = async (tag) => {
        try {
          const savedItem = await getSavedItem(tag);
          if (savedItem !== undefined) {
            storage[tag] = savedItem;
            item = savedItem;
          } else {
            item = defaultValue;
          }
        } catch (error) {
        } finally {
          return item;
        }
      };

      if (storage[tag] === undefined) {
        loadValue(tag).then((loadedValue) => {
          if (loadedValue !== undefined) {
            saveItem(loadedValue);
          }
        });
      }
    }, []);

    const getSavedItem = async (tag) => {
      const savedItem = await AsyncStorage.getItem(`@${tag}`);
      if (savedItem == null) {
        await AsyncStorage.removeItem(`@${tag}`);
        return undefined;
      }

      try {
        // if saved item is json, parse it
        const jsonItem = JSON.parse(savedItem);
        return jsonItem;
      } catch (error) {
        // if saved item is not json, return it
        return savedItem;
      }
    };

    const saveItem = async (newItem) => {
      try {
        if (newItem !== null) {
          setValue(newItem);
          // if type if object, stringify it
          const stringified = typeof newItem === 'object' ?
              JSON.stringify(newItem): newItem;
          await AsyncStorage.setItem(`@${tag}`, stringified);
          storage[tag] = newItem;
        }
      } catch (error) {
        console.log(error);
        alert('error saving data. please reach out to support');
      } finally {
        onFinished && onFinished();
      }
    };


    return [value, saveItem];
  };

  return {useStorage, storage};
})();
