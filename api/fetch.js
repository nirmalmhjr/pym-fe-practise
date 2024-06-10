

export const fetchUser = async (url,values)=>{

    try {
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json'
            },
           body:JSON.stringify({
            user:{
                'phone':values.phoneNumber
            }
           })
        });

        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error fetching data from fetchUser ::', error)
    }
}

export const verifyOTP = async (url, values, sessionToken)=>{
    
    try {
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'content-type': 'application/json'
            },
            body:JSON.stringify({
                phone: values.phoneNumber,
                otp: values.otp,
                session_token: sessionToken.value
            })
         
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error fetching data from verifyOTP ::', error)
    }


}