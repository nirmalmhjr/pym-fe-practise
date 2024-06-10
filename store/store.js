import { defineStore } from "pinia";

export const useLoginStore = defineStore('login',{
    state:()=>({
        isAdmin: false,
        //token: ''
    }),
    actions:{
        saveToken(token){
            this.token = token
        }
    }
    


})