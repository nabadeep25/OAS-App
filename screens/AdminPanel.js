import React,{useState,useEffect} from 'react'
import {StyleSheet,Image,KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import {Text,Container,Form,Input,Item,Button,H1,Spinner} from 'native-base'
import Axios from 'axios'
import {API} from '../Const'

import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-community/async-storage'

const AdminPanel= ()=>{
   
    const [data,setData]=useState('')

    const getdata=async ()=>{
        const user=await AsyncStorage.getItem('@user')
   const userinfo=await JSON.parse(user);
   setData(userinfo)
   
  }
    
  useEffect(() => {
    getdata();
  }, [])
   
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