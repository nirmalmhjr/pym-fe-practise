<script setup lang="ts">
import { ref, onMounted } from 'vue'
    import { useCheckTokenStore } from '~/store/checkToken';

    const tokenStore = useCheckTokenStore()
    const {token, userName, saveToken, loginStatus} = tokenStore

 


   

    definePageMeta({
        layout: false,
        middleware: 'auth'
    })

    
</script>

<template>
    <h1>this is index page</h1>
    <pre>data is : {{datas}}</pre>
</template>
