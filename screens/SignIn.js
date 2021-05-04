import React,{useState} from 'react'
import {StyleSheet,Image,KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import {Text,Container,Form,Input,Item,Button,H1,Spinner} from 'native-base'
import Axios from 'axios'
import {API} from '../Const'
import Welcome from '../assets/welcome.png'
import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-community/async-storage'

const SignIn=({navigation})=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [isloading,setIsloading]=useState(false)
    const [data,setData]=useState('')
    
    const signin=async ()=>{
      if(email && password) {
            setIsloading(true)
      await  Axios.post(`${API}/signin`,{email,password}).then((data)=>{
            console.log(data.data)
            if(data.data.user.role==1){
                //storage
             AsyncStorage.setItem('@user',JSON.stringify(data.data))
            
                Snackbar.show({
                    text:'Sign in sucesss',
                    backgroundColor:'green'
                })
                navigation.navigate("AdminPanel")
            }
            setIsloading(false)
            setData(data.data)
        }).catch((err)=>{
            console.error(err)
            setIsloading(false)
            Snackbar.show({
                text:'Sign in failed',
                backgroundColor:'red'
            })
        })
    }else{
        Snackbar.show({
            text:'Enter both fields',
            backgroundColor:'orange'
        })
    }
        
    }
    if(isloading){
        return(
            <Spinner />
        )
    }
    
    
    return(
        
        <Container style={styles.container}>
            <ScrollView>
            <H1 style={styles.hero}>Online Admission System</H1>
            <Image source={Welcome}
               style={styles.img}
               resizeMode='contain' />
           
           <Form>
                <Item style={styles.item}>
                    <Input
                    placeholder='Email'
                    value={email}
                    style={{}}
                    onChangeText={(t)=>setEmail(t)}
                    />
                </Item>
                <Item style={styles.item} >
                    <Input
                    placeholder='Password'
                    value={password}
                    style={{}}
                    onChangeText={(t)=>setPassword(t)}
                    secureTextEntry={true}
                    />
                </Item>
                <Button block rounded onPress={signin}>
                    <Text>SignIn</Text>
                </Button>
            </Form>
            </ScrollView>
        </Container>
        
    )
}
export default SignIn;
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