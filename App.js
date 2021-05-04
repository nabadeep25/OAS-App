

import React,{useState,useEffect} from 'react';
import {Spinner,Icon} from 'native-base'
import {
 
  StatusBar,
  StyleSheet,
 Text,
  View,
} from 'react-native';
import {NavigationContainer,} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createDrawerNavigator ,DrawerContentScrollView,DrawerItem,DrawerItemList} from '@react-navigation/drawer'

import AsyncStorage from '@react-native-community/async-storage'
import SignIn from './screens/SignIn'
import AdminPanel from './screens/AdminPanel';
import Application from './screens/Application';



const Stack=createStackNavigator();
const Drawer=createDrawerNavigator();


const App = () => {
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem label="ONLINE ADMISSION SYSTEM" inactiveBackgroundColor='#22CB5C'/>
       
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={() => alert('Are you sure ?')} inactiveBackgroundColor='#EB4D4B' inactiveTintColor='white'
        
        />
      </DrawerContentScrollView>
    );
  }

const [data, setData] = useState('')
const [isloading,setIsloading]=useState(false)

  const getdata=async ()=>{
    setIsloading(true)
    const user=await AsyncStorage.getItem('@user')
  const userinfo=await JSON.parse(user);
  setData(userinfo)
  setIsloading(false)
 console.log("data",data)
}

useEffect(() => {
getdata();
}, [])
 
if(isloading){
  return(
    <View style={{flex:1,alignContent:'center'
    }}>
       <Spinner />
       <Text style={{textAlign:'center'}}>Take a deep breath</Text>
    </View>
     
  )
}
 
  return (
    <NavigationContainer>
    
      {data.user?.role===0 ?(
        <Stack.Navigator >
      <Stack.Screen name='SignIn'component={SignIn} options={{title:'Sign in', headerTitleAlign:'center'}
      } />
      </Stack.Navigator>
      )
      :(
        <Drawer.Navigator drawerContentOptions={{ title:"OAS", }}
        drawerContent={props => <CustomDrawerContent {...props} />}
       >
          <Drawer.Screen name='AdminPanel'component={AdminPanel} options={{title:'Admin Panel', headerTitleAlign:'center'}} />
          <Drawer.Screen name='Application'component={Application} options={{
            title:"Application"
          }} />
        </Drawer.Navigator>
        
      ) }
      
      
    
   
  </NavigationContainer>
  );
};



export default App;
