<script setup lang="ts">
    import {getUserandInterceptor} from '~/api/interceptor'
    import { useCheckTokenStore } from '~/store/checkToken';

    const tokenStore = useCheckTokenStore()
    const {token, userName, saveToken, loginStatus} = tokenStore

    const datas= ref([])


    async function getUserData(){
        const response = await getUserandInterceptor()
        console.log('get user dAta() ', response.results);
        datas.value = await response.results
    }

    function getLocalToken(){
        if(!token){
            const test = localStorage.getItem('authToken')

            saveToken(test)
            loginStatus(true)
        }
    }


    definePageMeta({
        layout: false,
        middleware: 'auth'
    })

    onMounted(()=>{
        getUserData()
        getLocalToken()
    })
</script>

<template>
    <h1>this is index page</h1>
    <pre>{{data}}</pre>
</template>
