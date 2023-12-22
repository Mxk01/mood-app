import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, 
    TextInput, Button, Pressable, 
    FlatList, ActivityIndicator, 
    } from 'react-native'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


function Login() {
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
    const styles = StyleSheet.create({
        test: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        loading: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1b1b1b',
            color: 'white',
        },
        loginInput: {
            backgroundColor: 'white',
            borderRadius: 5,
            color: 'black',
            fontFamily: 'Lato',
            fontWeight: 'bold',
            width: 320,
            padding: 5
            
        },
        loginButton: {
            backgroundColor: '#FF7518',
            borderRadius: 5,
            color: 'white',
            padding: 10,
            textAlign: 'center',
            
            width: 250,
            fontWeight: 'bold',
        },
        resetText: {
            color: '#F54703',
            fontWeight: 'bold',
            fontFamily: 'Lato',
        },
        altAuthText: {
            color: '#FE7F2D'
        },
        loginLabels: {
            color: 'white',
        },
        oauthGroup: {
           
            width: 250,
            flexGrow: 0,
            
        },
        oauthButton: {
            width: 50,
            height: 50,
            backgroundColor: 'white',
            borderRadius: 100
        },
        
    })

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
        Navigate.navigate("Landing")
    }
    return (
         
        !loading && 
        <View style={styles.loading}>
            <Text style={styles.loginLabels}>Username</Text>
            <TextInput style={styles.loginInput} value='5'/>
            <Text style={styles.loginLabels}>Password</Text>
            <TextInput style={styles.loginInput} value='2'/>
            <Text style={styles.resetText}>Forgot Password?</Text>
            <Pressable onPress={handleSubmit}>
                
                <ActivityIndicator style={styles.loginButton}
                size='small' 
                color={'#ffffff'}/>
                
            </Pressable>
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
    )
}

export default Login;