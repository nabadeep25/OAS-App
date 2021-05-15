import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {View,ScrollView,Spinner} from 'react-native'
import { API } from '../Const';
import {Text,List,ListItem,Right,Body,Left,Button} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ApplicationRegular({navigation,route}) {

  
    const data=route.params.userdata;
    
  const [isloading,setIsloading]=useState(false)
  const [Applications, setApplications] = useState([])

const getallapplication=async()=>{
  setIsloading(true)
  axios.get(`${API}/applications/${data.user._id}`,
 { headers:{
      Authorization:`Bearer ${data.token}`
  }})
 .then(res=>{setApplications(res.data); 
  //console.log("application",Applications)
})
 .catch(err=>{console.log(err)})
 setIsloading(false);
  }
  
useEffect(() => {
  getallapplication()
  
  
}, [])
 
 
if(isloading){
  return(
    <View style={{flex:1,alignContent:'center'
    }}>
       <Spinner />
       <Text style={{textAlign:'center'}}>Wait a moment...</Text>
    </View>
     
  )
}
  //console.log("app",data.user)
  return (
    <>
     <ScrollView style={{flex:1}}>
      <List>
        <ListItem>
          <Body><Text> Regular Applications</Text></Body>
        </ListItem>
        {Applications.map((application,index)=>{
          //console.log(application)
          return(
            <ListItem key={index} thumbnail>
               <Left><Text>{index+1}</Text></Left>
              <Body><Text>{application.name}</Text></Body>
              <Right><Right style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
              <Icon name='book-open' size={32} color='blue' style={{}} onPress={()=>{navigation.navigate("Viewer",{userdata:data,appID:application._id})}}/>
               <Icon name='delete-circle-outline' size={32} color='red' style={{paddingLeft:20,alignSelf:'flex-end'}} />
               
              </Right></Right>
            </ListItem>
          )
        })}
      </List>
      </ScrollView>
    
    </>
  );
}
