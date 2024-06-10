import { defineStore } from 'pinia'

export const useCheckTokenStore = defineStore('token',()=>{
    //state
    const tokenFromStore = ref('')
    const isLogin = ref(false)
    const token = ref('')
    const userName = ref('')


    //methods
    function loginStatus(value){
        isLogin.value = value

        localStorage.setItem('isLogin', isLogin.value)
    }

    function saveToken(tokenReceived){
        token.value = tokenReceived

        localStorage.setItem('authToken', token.value)
    }

    function saveUser(userPhone){
        userName.value = userPhone

        localStorage.setItem('userName', userName.value)
    }

    function consoleValue(){
        console.log('from store isLogin : ',isLogin.value);
        console.log('from store token is : ', token.value);
    }

    return{
        userName, isLogin, token, saveToken, saveUser, loginStatus, consoleValue
    }
})