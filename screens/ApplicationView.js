import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {View,ScrollView} from 'react-native'
import { API } from '../Const';
import {Text,Header,Card,CardItem,Right,Body,Left} from 'native-base'

export default function ApplicationView({navigation,route}) {
    console.log("app view running..")
  const data=route.params.userdata
  const appId=route.params.appID
   
  const [isloading,setIsloading]=useState(false)
  const [Application, setApplication] = useState([])
 
  
const getapplication=async()=>{
 axios.get(`${API}/new/application/${appId}/${data.user._id}`,
    { headers:{
         Authorization:`Bearer ${data.token}`
     }})
    .then(res=>{setApplication(res.data);  
   
 })
    .catch(err=>{console.log(err)})
    console.log("application",Application)
  }
  
useEffect(() => {
    
  getapplication()
  
}, [appId])
 

if(isloading){
  return(
    <View style={{flex:1,alignContent:'center'
    }}>
       <Spinner />
       <Text style={{textAlign:'center'}}>Wait a moment...</Text>
    </View>
     
  )
}
  
  return (
    <>
     <ScrollView style={{flex:1}}>
  <Header><Text>{Application.name}</Text></Header>
  <Card>
  <CardItem><Text>Application ID:{Application._id}</Text></CardItem>
  <CardItem><Text>Name:{Application.name}</Text></CardItem>
  <CardItem><Text>Fathers name:{Application.fname}</Text></CardItem>
  <CardItem><Text>Mother name:{Application.mname}</Text></CardItem>
  </Card>
      </ScrollView>
    
    </>
  );
}
