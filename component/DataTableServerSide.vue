<template>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="totalItems"
      :items="serverItems"
      :loading="loading"
      :search="search"
      @update:options="loadItems"
      item-value="name"
    ></v-data-table-server>
</template>

<script setup lang="ts">
import { useCheckTokenStore } from '~/store/checkToken';

const tokenStore = useCheckTokenStore()
const { token, userName } = tokenStore


const itemsPerPage = ref(5)
const search = ref('')
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)



const headers = ref([
    { title: 'Name', value: 'name', align: 'start' },
    { title: 'Contact no.', value: 'contacts[0].contact_value' },
    { title: 'Take away', value: 'allow_take_away' },
    { title: 'Delivery', value: 'allow_delivery' },
    { title: 'Open at', value: 'opening_hours' },
    { title: 'closes at', value: 'closing_hours' },
])

async function loadItems({ page, itemsPerPage }) {
    loading.value = true
     
    const offset = (page - 1) * itemsPerPage
    console.log(' load items function ran');
    let url = `https://pick.alldaycode.xyz/api/v1/users/${userName}/associated-orgs/?limit=${itemsPerPage}&offset=${offset}`

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    }

    try {
        const response = await fetch(url, config)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        serverItems.value = data.results;
        totalItems.value = data.count;
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        loading.value = false;
    }
       

}


onMounted(() => {
    loadItems({page:1, itemsPerPage: itemsPerPage.value});
});

</script>
