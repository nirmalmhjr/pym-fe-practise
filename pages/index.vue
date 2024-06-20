<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCheckTokenStore } from '~/store/checkToken';
import DataTableServerSide from '~/component/DataTableServerSide.vue'

    const tokenStore = useCheckTokenStore()
    const {userName} = tokenStore

    const headers = ref([
    { title: 'Name', value: 'name', align: 'start' },
    { title: 'Contact no.', value: 'contacts[0].contact_value' },
    { title: 'Take away', value: 'allow_take_away' },
    { title: 'Delivery', value: 'allow_delivery' },
    { title: 'Open at', value: 'opening_hours' },
    { title: 'closes at', value: 'closing_hours' },
])

const itemsPerPage=ref(5)
   

    definePageMeta({
        layout: false,
        middleware: 'auth'
    })

    
</script>

<template>
    <DataTableServerSide 
    :headers="headers"
    :itemsPerPage="itemsPerPage"
    :userName = "userName"
    />
</template>
