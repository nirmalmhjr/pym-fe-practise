<script setup lang="ts">
    import {getUserandInterceptor} from '~/api/interceptor'

    const data= ref([])


    async function getUserData(){
        const response = await getUserandInterceptor()
        data.value = await response.results
    }

    onMounted(()=>{
        getUserData()
    })

    definePageMeta({
        layout: false,
        middleware: 'auth'
    })
</script>

<template>
    <pre>{{data}}</pre>
</template>
