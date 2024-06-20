import { useCheckTokenStore } from "~/store/checkToken";

export async function getInterceptor(endpoint, options={}){
const configRun = useRuntimeConfig()
const checkTokenStore = useCheckTokenStore()
const { token } = checkTokenStore

//setup headers
const headers={
    ...options.headers,
    'content-type': 'application/json'
}

if(token){
    headers.Authorization = `Token ${token}`
}

//set up full options object
const config = {
    ...options,
    headers
}


//set base URL

const url= `${configRun.public.baseURL}${endpoint}`

try{
    const response = await fetch(url,config)

    if(!response.ok){
        console.log(`HTTP error ! Status: ${response.status}, response`);
        navigateTo('/login')
    }

    if (response.status === 401) {
        console.error('Unauthorized access - perhaps redirect to login');
        navigateTo('/loginPage')
      } else if (response.status === 403) {
        console.error('Access forbidden - check your permissions');
      }

      const data = await response.json()
      return data
} 
catch(error){
    console.error('Fetch error:', error);
}
}


// for post Interceptor
export async function postInterceptor(endpoint, options={}){
    const configRun = useRuntimeConfig()
    const checkTokenStore = useCheckTokenStore()
    const { token } = checkTokenStore
    
    //setup headers
    const headers={
        ...options.headers,
        'content-type': 'application/json',
        'Accept': 'application/json'
    }
    
    if(token){
        headers.Authorization = `Token ${token}`
    }
    
    const body = JSON.stringify(options)

    //set up full options object
    const config = {
        ...options,
        headers,
        method: 'POST',
        body
    }
    
    
    //set base URL
    
    const url= `${configRun.public.baseURL}${endpoint}`
    
    try{
        const response = await fetch(url,config)
    
        if(!response.ok){
            console.log(`HTTP error ! Status: ${response.status}, response`);
            navigateTo('/login')
        }
    
        if (response.status === 401) {
            console.error('Unauthorized access - perhaps redirect to login');
            navigateTo('/loginPage')
          } else if (response.status === 403) {
            console.error('Access forbidden - check your permissions');
          }
    
          const data = await response.json()
          return data
    } 
    catch(error){
        console.error('Fetch error:', error);
    }
    }

