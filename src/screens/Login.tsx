import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, 
    TextInput, Button, Pressable, 
    FlatList, ActivityIndicator, TouchableOpacity, 
    } from 'react-native'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LoginStyles } from '../utils/styles/login';
const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

       interface IData {
        author: string;
        id: number;
        message: string;
    }
    interface IOathService {
        Google: string;
        Apple: string;
    }
    const Navigate = useNavigation()
    const [data, setData] = useState<Array<IData>>([])
    const [loading, setLoading] = useState<boolean>(false);
 const [oath, setOath] = useState<Array<object>>([{id: "1", message: "key1"},{id: "2", message: "key2"}])
     useEffect(() => {
        const fetchData = async() => {
            await axios.get('').then(res => {
                if( res.status === 200){
                   setData([res.data]) 
                   setLoading(false)
                }else{
                    setLoading(true)
                }
            }).catch(err => console.log(err))
        }
    
       
    }, [])
    
    const handleSubmit = () => {
        setLoading(true)
        navigation.push("Landing")
    }
    
   
    
  return (
      !loading && <View style={LoginStyles.container}>
      {/* Top Half */}
      <LinearGradient
        colors={['#fe7f2d', '#ff0200']}
        style={LoginStyles.topHalf}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Black Circle in the Middle of Top Half */}
        <View style={LoginStyles.circle} />
         
      </LinearGradient>
      <Text style={LoginStyles.mainText}>Moody</Text>
      
      {/* Form */}
      <View style={LoginStyles.formContainer}>
        
        {/* Your form components go here */}
        <TextInput style={LoginStyles.input} value='5' placeholder="Username" />
        <TextInput style={LoginStyles.input} value='2' placeholder="Password" secureTextEntry />
        {/* Add more form components as needed */}

        <TouchableOpacity>
          <LinearGradient
            colors={['#FF4500', '#FFA500']}
            start={[0, 0]}
            end={[1, 1]}
            style={LoginStyles.buttonContainer}
          >
     
            <Text style={LoginStyles.buttonText} onPress={handleSubmit}>Submit</Text>
 
           </LinearGradient>
           
        
        
        </TouchableOpacity>
        <Button title="Do not have an account?"          
           color={"transparent"}
           onPress={()=>navigation.navigate('Register')}/>
 
        <Text style={LoginStyles.altAuthText}>Continue with</Text>
            
            <FlatList
                snapToAlignment='center'
                horizontal
                data={oath}
                keyExtractor={(item: any) => item.id}
                renderItem={({item}) => { return <Pressable style={LoginStyles.oauthButton}></Pressable>}}
                style={LoginStyles.oauthGroup}
            />
   
                  </View>

      
      {/* Bottom Half */}
      <LinearGradient
        colors={['#ff0200', '#f54a03']}
        style={LoginStyles.bottomHalf}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
};

 
export default Login;
