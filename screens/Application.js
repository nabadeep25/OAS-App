import React,{useEffect,useState} from 'react';
import {View,Text} from 'react-native'

export default function Application({route}) {

  const [data,setData]=useState('')
    
  const [isloading,setIsloading]=useState(false)

  const getdata=async ()=>{
      setIsloading(true)

setData(route.params.userdata)
 setIsloading(false)
 
}
  
useEffect(() => {
  getdata();
  
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
  //console.log("app",route.params)
  return (
    <>
    <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
  <Text>{data.user?.name}</Text>
  <Text>{data.user?.role}</Text>
  <Text>{data.token}</Text>
  <Text>{data.user?.email}</Text>
    </View>
    </>
  );
}
