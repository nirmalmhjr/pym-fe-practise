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
import { getInterceptor } from '~/composables/interceptor';

const props = defineProps({
    headers:{
        type:Array,
        required: true
    },
    itemsPerPage:{
        type:Number,
        required: true
    },
    userName:{
        type: String,
        required: true
    }
})

const itemsPerPage = ref(props.itemsPerPage)
const search = ref('')
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)
const headers = ref(props.headers)
const userName = ref(props.userName)





async function loadItems({ page, itemsPerPage }) {
    loading.value = true
     
    const offset = (page - 1) * itemsPerPage
    console.log(' load items function ran');
    let url = `https://pick.alldaycode.xyz/api/v1/`

    const data = await getInterceptor(`users/${userName}/associated-orgs/?limit=${itemsPerPage}&offset=${offset}`)

        serverItems.value = data.results;
        totalItems.value = data.count;

        loading.value = false;
    
       

}


onMounted(() => {
    loadItems({page:1, itemsPerPage: itemsPerPage.value});
});

</script>
