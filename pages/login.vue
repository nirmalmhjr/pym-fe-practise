<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {fetchUser,verifyOTP } from '~/api/fetch'
import {useCheckTokenStore } from '~/store/checkToken'

const tokenStore = useCheckTokenStore()
const { isLogin, saveToken, saveUser, loginStatus, consoleValue } = tokenStore


const schema = yup.object({
    phoneNumber: yup.string().required().matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    otp: yup.string()
})

const { defineField, errors, handleSubmit } = useForm({
    validationSchema: schema
})

const [phoneNumber, phoneNumberAttrs] = defineField('phoneNumber')
const [otp, otpAttrs] = defineField('otp')

const sessionToken = ref('')
const logged = ref(false)

const onSubmit =   handleSubmit(async (values) => {
    let data = await fetchUser('accounts/onboard/',values)

    // console.log('response here on submit',data);
    sessionToken.value = data.session_token
    logged.value = true

});

const submitOTP = handleSubmit( async (values)=>{
    const tokenObject = await verifyOTP('accounts/onboard/verify/',values, sessionToken.value)
    
    console.log('response here on vertifyOTP',tokenObject);

    saveToken(tokenObject.token)
    console.log('phone user is ', tokenObject.user.phone);
    saveUser(tokenObject.user.phone)
    loginStatus(true)

    consoleValue()
    navigateTo('/')
    
}) 

</script>

<template>
    <form @submit="onSubmit" >
        <v-sheet width="400" class="mx-auto ">
        <v-card color="transparent" class="text-center py-6">
            <h1>Account Login</h1>
            <v-card-subtitle class="pt-4">
                Login / Register with just phone number
            </v-card-subtitle>

            <div class="flex items-center justify-center">
                <p class="">username</p>
                <v-text-field
                  v-model="phoneNumber"
                  v-bind="phoneNumberAttrs"
                  label="phone number"
                  name="phoneNumber"
                  type="text"
                  max=10
                  variant="solo"
                  class="px-2"
                ></v-text-field>
                <span color="red">
                    {{ errors.phoneNumber }}
                </span>
            </div>

            <v-btn type="submit" color="green-lighten-2">
                login
            </v-btn>
            <div v-if="logged">
                <v-otp-input
                  v-model="otp"
                  v-bind="otpAttrs"
                  name="otp"
                  focus-all
                >
                </v-otp-input>
        
                <span>{{ errors.otp }}</span>
        
                <v-btn @click="submitOTP">
                    Enter OTP
                </v-btn>
            </div>
        </v-card>

</v-sheet>
    
    </form>

</template>





<style scoped></style>