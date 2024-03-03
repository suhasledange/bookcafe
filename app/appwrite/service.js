const { conf } = require("../util/conf");
import { Client, Databases,ID,Query } from "appwrite";

export class Service{

    client = new Client()
    databases;
    
    constructor(){
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID);
        
        this.databases = new Databases(this.client);
    }

    async getBooks(){
        try {
            
            return this.databases.listDocuments(conf.DATABASE_ID,conf.COLLECTION_ID_BOOKSTORE);

        } catch (error) {
            throw error
        }
    }

}
const service = new Service()
export default service
