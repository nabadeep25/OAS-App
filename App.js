

import React,{useState,useEffect} from 'react';
import {Spinner} from 'native-base'
import {
 
  StatusBar,
  StyleSheet,
 Text,
  View,
} from 'react-native';
import {NavigationContainer, } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator ,DrawerContentScrollView,DrawerItem,DrawerItemList} from '@react-navigation/drawer'

import AsyncStorage from '@react-native-community/async-storage'
import SignIn from './screens/SignIn'
import AdminPanel from './screens/AdminPanel';
import Application from './screens/Application';
import ApplicationView from './screens/ApplicationView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ApplicationRegular from './screens/AppicationRegular';
import ApplicationViewerRegular from './screens/ApplicationViewerRegular';
import Users from './screens/Users'

const Stack=createStackNavigator();
const Drawer=createDrawerNavigator();
const Tab=createBottomTabNavigator();


const App = () => {
  function CustomDrawerContent(props) {
   
    return (
       <View style={{flex:1 }}>
        <DrawerContentScrollView {...props}>
          <View style={{ flex:1,margin:20}}>
            <Text style={{justifyContent:'center',fontSize:18,fontWeight:'bold',fontFamily:'open sans'}}>Online Admission System</Text>

            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,alignItems:'center'}}>
              <Icon name="account-circle" size={32} color='blue'/>
               <Text style={{paddingLeft:10}}>{data.user?.name}</Text>
               
            </View>
            
          </View>
         <View style={{backgroundColor:'#4DAF7C'}}>
           <DrawerItem icon={()=><Icon name='account-multiple' />} label="Users" onPress={()=>{props.navigation.navigate('Users')}} />
           <DrawerItem icon={()=><Icon name='security' />} label="Admin Panel" onPress={()=>{props.navigation.navigate('AdminPanel')}} />
           <DrawerItem icon={()=><Icon name='book-open' />} label="New Application" onPress={()=>{props.navigation.navigate('Application')}} />
           <DrawerItem icon={()=><Icon name='book' />} label="Regular Application" onPress={()=>{props.navigation.navigate('ApplicationRegular')}} />

           
         </View>
        {/* <DrawerItemList {...props} /> */}
       
      </DrawerContentScrollView>
      <View style={{}}>
       <DrawerItem icon={()=><Icon name='logout' />} label='Signout'  onPress={() => Signout()} inactiveTintColor='#EB4D4B'/>
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
const Signout=async()=>{
  try {
    await AsyncStorage.removeItem('@user')
    
  } catch (error) {
    console.log("signout error")
  }
  
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
        <Drawer.Navigator initialRouteName="AdminPanel" drawerContentOptions={{ title:"OAS", } }
        drawerContent={props => <CustomDrawerContent {...props} />  }
       >
           <Drawer.Screen name='Application'component={Application} options={{
            title:"Application"
          }} initialParams={{userdata:data}} />
           <Drawer.Screen name='Users'component={Users} options={{
            title:"Users"
          }} initialParams={{userdata:data}} />
           <Drawer.Screen name='ApplicationRegular'component={ApplicationRegular} options={{
            title:"Application (Regular)"
          }} initialParams={{userdata:data}} />
          <Drawer.Screen name='AdminPanel'component={AdminPanel} options={{title:'Admin Panel', headerTitleAlign:'center'}} 
          initialParams={{userdata:data}} />
          <Drawer.Screen name='Viewer'component={ApplicationView} options={{title:'Application viewer', headerTitleAlign:'center'}} 
           />
          <Drawer.Screen name='RViewer'component={ApplicationViewerRegular} options={{title:'Application viewer', headerTitleAlign:'center'}} 
           />
          
        </Drawer.Navigator>
        
      ) }
      
      
    
   
  </NavigationContainer>
  );
};



export default App;
