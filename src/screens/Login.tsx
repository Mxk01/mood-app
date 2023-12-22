import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, 
    TextInput, Button, Pressable, 
    FlatList, ActivityIndicator, TouchableOpacity, 
    } from 'react-native'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

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
      !loading && <View style={styles.container}>
      {/* Top Half */}
      <LinearGradient
        colors={['#fe7f2d', '#ff0200']}
        style={styles.topHalf}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Black Circle in the Middle of Top Half */}
        <View style={styles.circle} />
         
      </LinearGradient>
      <Text style={styles.mainText}>Moody</Text>
      
      {/* Form */}
      <View style={styles.formContainer}>
        
        {/* Your form components go here */}
        <TextInput style={styles.input} value='5' placeholder="Username" />
        <TextInput style={styles.input} value='2' placeholder="Password" secureTextEntry />
        {/* Add more form components as needed */}

        <TouchableOpacity>
          <LinearGradient
            colors={['#FF4500', '#FFA500']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.buttonContainer}
          >
     
            <Text style={styles.buttonText} onPress={handleSubmit}>Submit</Text>
 
           </LinearGradient>
           
        
        
        </TouchableOpacity>
        <Button title="Do not have an account?"          
           color={"transparent"}
           onPress={()=>navigation.navigate('Register')}/>
 
        <Text style={styles.altAuthText}>Continue with</Text>
            
            <FlatList
                snapToAlignment='center'
                horizontal
                data={oath}
                keyExtractor={(item: any) => item.id}
                renderItem={({item}) => { return <Pressable style={styles.oauthButton}></Pressable>}}
                style={styles.oauthGroup}
            />
   
                  </View>

      
      {/* Bottom Half */}
      <LinearGradient
        colors={['#ff0200', '#f54a03']}
        style={styles.bottomHalf}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  topHalf: {
    position: 'absolute',
    top: -300, // Adjust the value to create space
    left: -150,
    
    right: 0,
    bottom: '50%',
    borderRadius: 400, // Make it a circle
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'black',
    zIndex: 100,
    position: 'absolute',
    top: '80%',
    left: '80%',
    transform: [{ translateX: -100 }, { translateY: -90 },{rotateZ:'15deg'}],
  },
  bottomHalf: {
    position: 'absolute',
    top: '68%',
    left: 25,
    right: 0,
    bottom: -200,
    borderRadius: 200, // Make it a circle
  },
  formContainer: {
    backgroundColor: 'black', // Form background color
    borderRadius: 20,
    padding: 20,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    zIndex: 1,
    top: 50, // Adjust this value to move the form down
  },
  input: {
    height: 40,
    borderColor: '#fe7f2d',
    borderRadius: 25,
    color: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textTransform:'uppercase',
    textAlign: 'center',
  },
  underneathText: {
    color: 'white',
    marginTop: 20,
  },
  mainText: {
    fontSize:30,
    color:'black',
    textTransform:'uppercase',
    fontWeight:'bold',
    letterSpacing:3,
    marginBottom:50
  },
  altAuthText: {
    color: '#FE7F2D',
    fontSize:16,
    marginLeft:70
},
loginLabels: {
    color: 'white',
},
oauthGroup: {
    marginLeft:50,
    width: 350,
    padding:10,
 
    flexGrow: 0,

},
oauthButton: {
    width: 50,
    height: 50,
    marginRight:20,
    backgroundColor: 'white',
    borderRadius: 100
},
});

export default Login;
