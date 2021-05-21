import React,{useState,useEffect} from 'react'
import {StyleSheet,Image,KeyboardAvoidingView, Platform, ScrollView,View} from 'react-native'
import {Text,Container,Form,Input,Item,Button,H1,Spinner,Card,CardItem,Badge} from 'native-base'
import axios from 'axios'
import {API} from '../Const'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-community/async-storage'

const AdminPanel= ({route})=>{
   
    const [data,setData]=useState('')
    const [application, setapplication] = useState(0)
   const [oapplication, setoapplication] = useState(0)
   const [ student,setstudent] = useState(0)
    const [admin, setadmin]= useState(0)
    
    const [isloading,setIsloading]=useState(false)

    const getdata=async ()=>{
        setIsloading(true)
       await axios.get(`${API}/count/application`).then(res=>{setapplication(res.data)}).catch(err=>{});
       await axios.get(`${API}/count/oapplication`).then(res=>{setoapplication(res.data)}).catch(err=>{});
       await axios.get(`${API}/count/student`).then(res=>{setstudent(res.data)}).catch(err=>{});
       await axios.get(`${API}/count/admin`).then(res=>{setadmin(res.data)}).catch(err=>{ })
  setData(route.params.userdata)
   setIsloading(false)
   
  }
    
  useEffect(() => {
    getdata();
    
  }, [])
   

  // if(isloading){
  //   return(
  //     <View style={{flex:1,alignContent:'center'
  //     }}>
  //        <Spinner />
  //        <Text style={{textAlign:'center'}}>Wait a moment...</Text>
  //     </View>
       
  //   )
  // }
    return(
        
        <Container style={styles.container}>
            <ScrollView>
           <H1 style={styles.hero}>Hi, {data.user?.name} </H1>
            <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
             <Card style={styles.card}>
               <CardItem header style={styles.carditem}>
                  <H1 style={styles.text}>User</H1>
               </CardItem>
               <CardItem style={styles.carditem}>
               <Icon name='account' size={32}/>
               </CardItem>
               <CardItem style={styles.carditem} >
                <Badge ><Text >{student}</Text></Badge>
               </CardItem>
             </Card>

             <Card style={styles.card}>
               <CardItem header style={styles.carditem}>
                
                  <H1 style={styles.text}>Admin</H1>
               </CardItem>
              
               <CardItem style={styles.carditem}>
               <Icon name='account-star' size={32}/>
               </CardItem>
               <CardItem style={styles.carditem} >
                <Badge ><Text >{admin}</Text></Badge>
               </CardItem>
             </Card>

             <Card style={styles.card}>
               <CardItem header style={styles.carditem}>
                  <H1 style={styles.text}>New Application</H1>
               </CardItem>
               <CardItem style={styles.carditem}>
               <Icon name='book-open' size={32}/>
               </CardItem>
               <CardItem style={styles.carditem} >
                <Badge ><Text >{application}</Text></Badge>
               </CardItem>
             </Card>

             <Card style={styles.card}>
               <CardItem header style={styles.carditem}>
                  <H1 style={styles.text}>Old Application</H1>
               </CardItem>
               <CardItem style={styles.carditem}>
               <Icon name='book' size={32}/>
               </CardItem>
               <CardItem style={styles.carditem} >
                <Badge ><Text >{oapplication}</Text></Badge>
               </CardItem>
             </Card>

            </View>
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
backgroundColor:'#CAD5E2'
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
},
card:{
  width:'45%',
  alignContent:'center',
  justifyContent:'center',
  backgroundColor:'#26C281',
 
},
carditem:{

justifyContent:'center',
backgroundColor:'#26C281'
},
text:{
  textAlign:'center',
  color:'white'
}
})