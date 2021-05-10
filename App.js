

import React,{useState,useEffect} from 'react';
import {Spinner,H1} from 'native-base'
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
import ApplicationView from './screens/ApplicationView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Stack=createStackNavigator();
const Drawer=createDrawerNavigator();


const App = () => {
  function CustomDrawerContent(props) {
   
    return (
       <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
          <View style={{ flex:1}}>
            <Text>Online Admission System</Text>
          </View>
       
        <DrawerItemList {...props} />
       
      </DrawerContentScrollView>
      <View style={{}}>
       <DrawerItem icon={()=><Icon name='logout' />} label='Signout'  onPress={() => alert('Are you sure ?')} inactiveTintColor='#EB4D4B'/>
      </View> 
      
      </View>
    );
  }

const [data, setData] = useState('')
const [isloading,setIsloading]=useState(false)

  const getdata= async()=>{
    setIsloading(true)
    const user= await AsyncStorage.getItem('@user')
  const userinfo=await JSON.parse(user);
  setData(userinfo)
  setIsloading(false)
 console.log("App jsdata",data)
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
        <Drawer.Navigator drawerContentOptions={{ title:"OAS", } }
        drawerContent={props => <CustomDrawerContent {...props} />}
       >
           <Drawer.Screen name='Application'component={Application} options={{
            title:"Application"
          }} initialParams={{userdata:data}} />
          <Drawer.Screen name='AdminPanel'component={AdminPanel} options={{title:'Admin Panel', headerTitleAlign:'center'}} 
          initialParams={{userdata:data}} />
          <Drawer.Screen name='Viewer'component={ApplicationView} options={{title:'Application viewer', headerTitleAlign:'center'}} 
           />
          
        </Drawer.Navigator>
        
      ) }
      
      
    
   
  </NavigationContainer>
  );
};



export default App;
