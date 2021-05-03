import React,{useState} from 'react'
import {StyleSheet,Image} from 'react-native'
import {Text,Container,Form,Input,Item,Button,H1} from 'native-base'

import Welcome from '../assets/welcome.png'

const SignIn=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const signin=()=>{
        //
    }
    return(
        <Container>
            <H1>Online Admission System</H1>
            <Image source={Welcome}
               style={{ height:150}}
               resizeMode='contain' />
            <Form>
                <Item>
                    <Input
                    placeholder='Email'
                    value={email}
                    style={{}}
                    onChangeText={(t)=>setEmail(t)}
                    />
                </Item>
                <Item>
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
        </Container>
    )
}
export default SignIn;
const styles=StyleSheet.create({
    
})