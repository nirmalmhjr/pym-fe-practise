import { postInterceptor } from "../composables/interceptor"


export const fetchUser = async (url,values)=>{
    const data = await postInterceptor(url,{
        user:{
            'phone': values.phoneNumber
        }
    })

    return data
    
}

export const verifyOTP = async (url,values, sessionToken) =>{
    const data =  await postInterceptor(url, {
            phone: values.phoneNumber,
            otp: values.otp,
            session_token: sessionToken
    })
    return data
}