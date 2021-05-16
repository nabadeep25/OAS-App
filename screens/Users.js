import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {View,ScrollView,Spinner, StyleSheet} from 'react-native'
import { API } from '../Const';
import {Text,List,ListItem,Right,Body,Left,Button, Badge, Header} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Snackbar from 'react-native-snackbar';

export default function Users({navigation,route}) {

  
    const data=route.params.userdata;
    const [render,setRender]=useState(0)
  const [isloading,setIsloading]=useState(false)
  const [Users, setUsers] = useState([])

const getallusers=async()=>{
  setIsloading(true)
  axios.get(`${API}/users/${data.user._id}`,
 { headers:{
      Authorization:`Bearer ${data.token}`
  }})
 .then(res=>{setUsers(res.data); 
 
})
 .catch(err=>{console.log(err)})
 setIsloading(false);
  }
  
useEffect(() => {
  getallusers()
  
  
}, [render])
 
const deleteUser=(userId)=>{
  axios.delete(`${API}/delete/${data.user._id}?uid=${userId}`,
        { headers:{
                Authorization:`Bearer ${data.token}`
          }})
  .then(res=>{
    setRender(render+1);
    Snackbar.show({
      text:' User Deleted Sucessfully',
      backgroundColor:'green',
      l
    })})
   
   .catch(err=>{
    Snackbar.show({
      text:'Deletion Failed',
      backgroundColor:'red',
      l
    })
   })
  
  }

if(isloading){
  return(
    <View style={{flex:1,alignContent:'center'
    }}>
       <Spinner />
       <Text style={{textAlign:'center'}}>Wait a moment...</Text>
    </View>
     
  )
}
const statusResolve=(status)=>{
switch (status) {
    case -1:
        return 'Not Submited'
    case 0:
        return 'Reviewing' 
    case 1:
         return 'Rejected'
    case 2:
            return 'Resubmit'
    case 3:
         return 'Verified'  
    case 4:
            return 'Completed' 

    default:
        return '<Text>Unknown</Text>'
}
}
  return (
    <>
     <ScrollView style={{flex:1}}>
         <Header><Text style={{color:'white', fontSize:26 }} >Users </Text></Header>
      <List >
       
        {Users.map((user,index)=>{
          
          return(
            <ListItem key={index} thumbnail style={styles.list}>
               <Left><Text>{index+1}</Text></Left>
              <Body><Text>Name: {user.name}</Text>
              <Text> Email :{user.email}</Text>
             
          <Badge style={{backgroundColor:'#2C3A47'}} primary ><Text>{statusResolve(user.status)}</Text></Badge>
              </Body>
              <Right style={{}}>
              <Icon name='delete-circle-outline' size={32} color='red' style={{paddingLeft:10,alignSelf:'flex-end'}} 
               onPress={()=>{deleteUser(user._id)}} />
               </Right>
            </ListItem>
          )
        })}
      </List>
      </ScrollView>
    
    </>
  );
}
const styles=StyleSheet.create({
    list:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'

    }
})
