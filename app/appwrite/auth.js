const { conf } = require("../util/conf");
import { Client, Account, ID } from "appwrite";

export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID);
        
        this.account = new Account(this.client);
        }

    async createAccount({email,password,name,phone}){
        try {
            
           const userAccount = await this.account.create(ID.unique(),email,password,name,phone)
        
           if(userAccount){
                // return userAccount
                return this.loginAccount({email,password});

           }else{
            return userAccount;
           }

        } catch (error){
            throw error;
        }
    }

    async loginAccount({email,password}){
        try {
            
            return await this.account.createEmailPasswordSession(email,password);

        } catch (error) {
            throw error;
        }
    }

    async logoutAccount(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error
        }
    }


}

const authService = new AuthService();
export default authService;