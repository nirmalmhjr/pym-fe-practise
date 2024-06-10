<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
    phoneNumber: yup.string().required().matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    otp: yup.string()
})

const { defineField, errors, handleSubmit } = useForm({
    validationSchema: schema
})

const [phoneNumber, phoneNumberAttrs] = defineField('phoneNumber')
const [otp, otpAttrs] = defineField('otp')

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});

function submitOTP (){

}

</script>

<template>
    <v-form @submit.prevent="onSubmit">
        <v-img class="mx-auto my-6" max-width="228"
            src="data:image/png;base64,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"></v-img>
        <!-- src="https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png" -->

        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis text-center pb-3">Phone Number</div>

             <v-text-field
             density="compact"
             placeholder="enter your number"
             prepend-inner-icon="mdi-phone"
             variant="outlined"
             v-model="phoneNumber"
             v-bind="phoneNumberAttrs"
           ></v-text-field>
         <span color="red">{{ errors.phoneNumber }}</span>

        <div class="d-flex justify-center">
            <v-btn type="submit" class="mb-8 mt-4" color="blue" desity="default" rounded="lg" size="large" variant="elevated">
                Log In
            </v-btn>
        </div>
        <!-- for OTP -->
        <div >
                <v-otp-input
                  v-model="otp"
                  v-bind="otpAttrs"
                  name="otp"
                  focus-all
                >
                </v-otp-input>
        
                <span>{{ errors.otp }}</span>
                
                <div class="d-flex justify-center">
                    <v-btn
                      class="my-4 "
                      color="green-lighten-1"
                      desity="default"
                      rounded="lg"
                      size="large"
                      type="submit"
                      variant="elevated"
                      @click="submitOTP"
                    >
                        Enter OTP
                    </v-btn>

                </div>
            </div>


        </v-card>
    </v-form>
</template>





<style scoped></style>