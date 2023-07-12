# React Native Storage

If you ever wanted to share a state across your project and save the value to device local storage whenever your made a change, you just found the package that will help you solve this problem. 

The package also saves in memory values of the data you call from your local storage and updates it whenever you make a change to the data to decrease the load time instead of having to fetch the data from local storage everytime you need it.

When use @makhlouf/react-native-storage, the value stored in memory will be assigned to your state. If that value doesn't exist, the package will try to capture that value from your local storage. Otherwise, the default value you provided will be used to store the value of the state and persist that value in local storage. You can also pass a function that wwill be triggered when the save to local storage is completed. One use case is passing in a state change such as isLoaded(true) that will execute when the save is completed, so that you can sync accessing it only after the save was completed. 

## Getting Started

To install 
```
npm i @makhlouf/react-native-storage
```

Usage
```
import Storage from '@makhlouf/react-native-storage';


const [user, setUser] = Storage.useStorage({});

console.log(Storage.storage)  {user: {}}
```
