import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {View,StyleSheet,ScrollView} from 'react-native'
import { API } from '../Const';
import {Text,Header,Card,CardItem,Spinner,Thumbnail} from 'native-base'
import Moment from 'moment'



export default function ApplicationViewerRegular({navigation,route}) {
   
  const data=route.params.userdata
  const appId=route.params.appID
   
  const [isloading,setIsloading]=useState(false)
  const [Application, setApplication] = useState('')

 
  
const getapplication=async()=>{
 axios.get(`${API}/application/${appId}/${data.user._id}`,
    { headers:{
         Authorization:`Bearer ${data.token}`
     }})
    .then(res=>{setApplication(res.data)
        console.log(Application);  
         
         
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
  
     <ScrollView style={{flex:1,backgroundColor:'#CAD3C8'}}>
     <Header style={{flex:1,justifyContent:'center',}}><Text style={{color:'white',fontSize:20}}>{Application.name}</Text></Header>
  <Card style={styles.card}>
   
  <CardItem style={styles.carditem}><Text style={styles.label}>Application ID:</Text><Text>{Application._id}</Text></CardItem>
  <CardItem style={styles.carditem}><Text style={styles.label}>Name:</Text><Text>{Application.name}</Text></CardItem>
  <CardItem style={styles.carditem}><Text style={styles.label}>Registration Number:</Text><Text>{Application.regno}</Text></CardItem>
  <CardItem style={styles.carditem}><Text style={styles.label}>Roll Number :</Text><Text>{Application.rollno}</Text></CardItem>
 <CardItem style={styles.carditem}><Text style={styles.label}>Branch:</Text><Text>{Application.branch}</Text></CardItem>
 <CardItem style={styles.carditem}><Text style={styles.label}>Semester:</Text><Text>{Application.sem}</Text></CardItem>
 <CardItem style={styles.carditem}><Text style={styles.label}>Submition Date:</Text><Text>{Moment(Application.createdAt).format("YYYY-MM-DD  hh:mm")}</Text></CardItem>


  </Card>
 
 


      
      </ScrollView>
     
    </>
  );
}
const styles=StyleSheet.create({
    card:{
        marginTop:20,
        paddingVertical:20,
        backgroundColor:'#D6A2E8',
        borderRadius:20,
        elevation:20

    },
    carditem:{
        backgroundColor:'#D6A2E8'
    },
    label:{
       fontWeight:'bold'
    },item:{
        marginBottom:10,
        
    }
     
    })