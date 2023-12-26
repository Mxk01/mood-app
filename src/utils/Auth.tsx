import axios, { AxiosError } from 'axios';

enum Roles{
    free,
    verifed,
    premium,
    admin
}
    
interface User{
    name: string;
    age: number;
    email: string;
    password: string;
    id: string | number;
    created_at: Date;
    is_verified: boolean;
    images: string[];
    role: Roles.free;
}
interface TokenResponse{
        
    access_token: string;
    refresh_token: string;

}

const sendForm = async (user: User, url: string): Promise<TokenResponse | undefined> => {
    try {
        const response = await axios.post(url, user, { headers: { 'Content-Type': 'application/json'}})
        const { access_token, refresh_token } = response.data

        if (response.status >= 200 && response.status < 300) {
            // handle success
            return {access_token, refresh_token}
        }else{
            // handle error
        
            console.error('server responded with status: ' , response.status)
        }

    }catch(error: AxiosError | unknown) {
        console.log('Failed to send form:', error);
    }
        
}


export default sendForm