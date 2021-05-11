import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {View,StyleSheet,ScrollView,Image} from 'react-native'
import { API } from '../Const';
import {Text,Header,Card,CardItem,Right,Body,Left,Form,Item,Button,Textarea,Spinner} from 'native-base'
import {Picker} from '@react-native-picker/picker'
import welcome from '../assets/welcome.png'
import { color } from 'react-native-reanimated';
import Snackbar from 'react-native-snackbar';
export default function ApplicationView({navigation,route}) {
   
  const data=route.params.userdata
  const appId=route.params.appID
   
  const [isloading,setIsloading]=useState(false)
  const [Application, setApplication] = useState([])
  const [remark,setRemark]=useState('')
  const [status,setStatus]=useState('')
  const [branch,setBranch]=useState('')
 
  
const getapplication=async()=>{
 axios.get(`${API}/new/application/${appId}/${data.user._id}`,
    { headers:{
         Authorization:`Bearer ${data.token}`
     }})
    .then(res=>{setApplication(res.data);  
         setStatus(Application.status)
         
 })
    .catch(err=>{console.log(err)})
    console.log("application",Application)
  }

  
    const photoUrl=`${API}/new/application/photo/${appId}/${data.user._id}?token=${data.token}`
    const marksheetUrl=`${API}/new/application/marksheet/${appId}/${data.user._id}?token=${data.token}`
    const scorecardUrl=`${API}/new/application/scorecard/${appId}/${data.user._id}?token=${data.token}` 
  

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

const update=async ()=>{
    if(status && branch) {
          setIsloading(true)
    await  axios.put(`${API}/update/${appId}/${data.user._id}`,{status,remark,branch},{
        headers:{
          Authorization:`Bearer ${data.token}`
      }
      }).then((data)=>{
          
            Snackbar.show({
                  text:'Updated successfully',
                  backgroundColor:'green'
              })
          setIsloading(false)
          
      }).catch((err)=>{
          console.error(err)
          setIsloading(false)
          Snackbar.show({
              text:'Updation  failed',
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
  return (
    <>
     
     <ScrollView style={{flex:1}}>
     <Header style={{flex:1,justifyContent:'center',}}><Text style={{color:'white',fontSize:20}}>{Application.name}</Text></Header>
  <Card>
  <CardItem><Text style={styles.label}>Application ID:</Text><Text>{Application._id}</Text></CardItem>
  <CardItem><Text style={styles.label}>Name:</Text><Text>{Application.name}</Text></CardItem>
  <CardItem><Text style={styles.label}>Father's name:</Text><Text>{Application.fname}</Text></CardItem>
  <CardItem><Text style={styles.label}>Mother's name:</Text><Text>{Application.mname}</Text></CardItem>
  <CardItem><Text style={styles.label}>Mark:</Text><Text>{Application.mark}</Text></CardItem>
  <CardItem><Text style={styles.label}>Percentage:</Text><Text>{Application.percentage}</Text></CardItem>
  <CardItem><Text style={styles.label}>Preference 1:</Text><Text>{Application.p1}</Text></CardItem>
  <CardItem><Text style={styles.label}>Preference 2:</Text><Text>{Application.p2}</Text></CardItem>
  <CardItem><Text style={styles.label}>Preference 3:</Text><Text>{Application.p3}</Text></CardItem>
  <CardItem><Text style={styles.label}>Branch:</Text><Text>{Application.branch}</Text></CardItem>
  <CardItem><Text style={styles.label}>Remark:</Text><Text>{Application.remark}</Text></CardItem>

  </Card>
  <Image source={{uri:photoUrl}} width='auto' height='150' resizeMode='contain' />
  {/* <Image source={{uri:marksheetUrl}} />
  <Image source={{uri:scorecardUrl}}/> */}
  <View style={{flex:1,backgroundColor:'red'}}>
  <Image source={{uri:'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png'}}
  style={{}} resizeMode='contain'
  />
  </View>
  <Form style={{padding:10,backgroundColor:'#CAD5E2'}}>
               
              <View style={styles.item} >
                  <Textarea style={{color:'black'}} value={remark} onChangeText={(t)=>setRemark(t)} placeholder='Remark,If any' />
                  </View>
             
                  <View style={styles.item}>
                  <Picker 
                  onValueChange={(value,index)=>setBranch(value)} 
                  selectedValue={Application.branch}>
                  <Picker.Item  label="No Branch" value="No Branch" />
                <Picker.Item label={Application.p1} value={Application.p1} />
                <Picker.Item label={Application.p2} value={Application.p2 }/>
                <Picker.Item label={Application.p3} value={Application.p3} />
              
                  </Picker>
                  </View>
                  <View style={styles.item}>
                  <Picker 
                  onValueChange={(value,index)=>setStatus(value)} 
                  selectedValue={status}>
                  <Picker.Item  label="Reviewing" value="0" />
                <Picker.Item label="Rejected" value="1" />
                <Picker.Item label="Resubmit" value="2" />
                <Picker.Item label="Verified" value="3" />
              
                  </Picker>
                  </View>
             
                <Button block rounded style={styles.item,{backgroundColor:'#00D84A'}} onPress={update}>
                    <Text>Update</Text>
                </Button>
            </Form>
      </ScrollView>
    
    </>
  );
}
const styles=StyleSheet.create({
    
    label:{
       fontWeight:'bold'
    },item:{
        marginBottom:10,
        backgroundColor:'#E07C24',
        color:'black'
    }
     
    })