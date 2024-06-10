import { useCheckTokenStore } from "~/store/checkToken"

export  const getUserandInterceptor = async (endpoint, options= {}) =>{
    const CheckTokenStore = useCheckTokenStore()
    const {token, userName} = CheckTokenStore

    //set up headers for request
    const headers = {
        ...options.headers,
        'content-type': 'application/json'
    }

    if(token){
        headers.Authorization = `Token ${token}`
    }

    const config = {
        ...options,
        headers,
    }

    //set base URL
    const url = `https://pick.alldaycode.xyz/api/v1/users/${userName}/associated-orgs/`

    
    
    //Handle the response interceptor
    try {
        const response = await fetch(url, config)
        console.log('from interceptor response is ', response);

        //handle status codes
        if(!response.ok){
            console.error(`HTTP error! Status: ${response.status}`, response)
        }
        
        if(response.status === 401){
            console.error('Unauthorized access - perhaps redirect to login');
            navigateTo('/login')
        } else if(response.status === 403){
            console.error('Access forbidden - check your permissions');
        }

        const data = response.json()
        return data
    } catch (error) {
        console.error('Fetch Interceptor error :: ', error);
    }

}