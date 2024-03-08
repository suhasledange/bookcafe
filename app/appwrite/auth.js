const { conf } = require("../util/conf");
import { Client, Account, ID } from "appwrite";

export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID)
            
        this.account = new Account(this.client);

        }
    
    async verifyEmail({id,secret}){
       return await this.account.updateVerification(id,secret)
    }

    async createAccount({email,name,password,phone}){

        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
           if(userAccount){
                await this.loginAccount({email,password})
                await this.account.updatePhone(phone,password)
                return await this.account.createVerification("https://bookcafee.vercel.app/verify")
           }
                        
        } catch (error){
            throw error;
        }
    }

    async loginAccount({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
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