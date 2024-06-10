<template>
  <NuxtLayout>
    <!-- <v-btn @click="toggleTheme">toggle theme</v-btn> -->
    <v-switch inset @change="toggleTheme" ></v-switch>
    <v-app>
      <NuxtPage />
    </v-app>

  </NuxtLayout>
</template>

<script setup>
  import { useTheme } from 'vuetify'

const theme = useTheme()

// function toggleTheme () {
//   theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
// }

const isDarkTheme = ref(theme.global.current.value.dark)

function toggleTheme(){
  isDarkTheme.value= !isDarkTheme.value
}

watch(isDarkTheme, (newValue)=>{
  theme.global.name.value = newValue ? 'light': 'dark'
})
</script>