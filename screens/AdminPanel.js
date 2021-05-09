import React,{useState,useEffect} from 'react'
import {StyleSheet,Image,KeyboardAvoidingView, Platform, ScrollView,View} from 'react-native'
import {Text,Container,Form,Input,Item,Button,H1,Spinner} from 'native-base'
import Axios from 'axios'
import {API} from '../Const'

import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-community/async-storage'

const AdminPanel= ()=>{
   
    const [data,setData]=useState('')
    const [isloading,setIsloading]=useState(false)

    const getdata=async ()=>{
        setIsloading(true)
        const user=await AsyncStorage.getItem('@user')
   const userinfo=await JSON.parse(user);
   setData(userinfo)
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
    return(
        
        <Container style={styles.container}>
            <ScrollView>
    <H1 style={styles.hero}>Hi, {data.user?.name} </H1>
            
            </ScrollView>
        </Container>
        
    )
}
export default AdminPanel;

const styles=StyleSheet.create({
container:{
flex:1,
justifyContent:'flex-start',
padding:10,
backgroundColor:'#50DBB4'
},
hero:{
    textAlign:'center',
    padding:10,
    marginBottom:20
},
img:{
     width:'auto',
     height:150
},
item:{
    marginBottom:10
}
})