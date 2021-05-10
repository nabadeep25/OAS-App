import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {View,ScrollView,Spinner} from 'react-native'
import { API } from '../Const';
import {Text,List,ListItem,Right,Body,Left,Button} from 'native-base'

export default function Application({navigation,route}) {

  
    const data=route.params.userdata;
    
  const [isloading,setIsloading]=useState(false)
  const [Applications, setApplications] = useState([])

const getallapplication=async()=>{
  setIsloading(true)
  axios.get(`${API}/new/applications/${data.user._id}`,
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
          <Body><Text>Applications</Text></Body>
        </ListItem>
        {Applications.map((application,index)=>{
          //console.log(application)
          return(
            <ListItem key={index} thumbnail>
               <Left><Text>{index+1}</Text></Left>
              <Body><Text>{application.name}</Text></Body>
              <Right><Button onPress={()=>{navigation.navigate("Viewer",{userdata:data,appID:application._id})}} style={{color:'red'} }><Text>Open</Text></Button></Right>
            </ListItem>
          )
        })}
      </List>
      </ScrollView>
    
    </>
  );
}
