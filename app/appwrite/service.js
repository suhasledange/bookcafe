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
            return this.databases.listDocuments(conf.DATABASE_ID,conf.COLLECTION_ID_BOOKSTORE,[
                Query.limit(50)
            ]);
        } catch (error) {
            throw error
        }
    }

    async getBook(DocId){
        try {

            return this.databases.getDocument(conf.DATABASE_ID,conf.COLLECTION_ID_BOOKSTORE,DocId)

        } catch (error) {
            throw error
        }
    }

    async getBooksByGenre(genre) {
        try {
        
            return this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID_BOOKSTORE,
                [
                    Query.search('genre',genre)
                ]
            );
        } catch (error) {
            throw error;
        }
    }

    async getBooksBySearch(res){
        try {
            return this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID_BOOKSTORE,
                [
                    Query.search('bookName',res)
                ]
            );
        } catch (error) {
            throw error;
        }
    }
    async updateBookQuantity(data){
        
        const bookQuantity = data.bookQuantity - data.quantity;
        if(bookQuantity === 0){
            data.availability = false;
        }
        try {
            return await this.databases.updateDocument(conf.DATABASE_ID,conf.COLLECTION_ID_BOOKSTORE,data.bookId,{
                availability:data.availability,
                bookQuantity:bookQuantity,
            })
            
        } catch (error) {
            console.log("error updating book",error)
            
        }
    }
    async returnBook(Id){
        try {


          return this.databases.updateDocument(conf.DATABASE_ID,conf.COLLECTION_ID_ORDERLIST,Id,{
                payment:"cancel",
                status:"Request",
                request:"Returning"
            });
        } catch (error) {
            throw error
        }
    }
    async createUser(data){
        try {
               return await this.databases.createDocument(conf.DATABASE_ID,conf.COLLECTION_ID_USERDETAILS,ID.unique(),{
                    UserId:data.$id,
                    email:data.email,
                    address:[],
                    orders:[],
                    name:data.name,
                    phone:data.phone || "",
               })
        } catch (error) {   
            console.log("error creating user",error)
        }
    }

    async cancelOrder(Id){
        try {
            
           await this.databases.updateDocument(conf.DATABASE_ID,conf.COLLECTION_ID_ORDERLIST,Id,{
                payment:"cancel",
                status:"Request",
                request:"Canceling"
            });

        } catch (error) {
            console.log('error creating order', error);
            
        }
    }

    async createOrder(data) {
        try {
            const currentDate = new Date();

            const order = await this.databases.createDocument(conf.DATABASE_ID, conf.COLLECTION_ID_ORDERLIST, ID.unique(), {
                DateOfOrder: currentDate, 
                DueDate: null, 
                UserId: data.userId,
                phone: data.phone,
                paymentMethod: data.paymentMethod,
                address: data.address,
                name: data.name,
                price: data.price,
                bookId:data.bookId,
                email:data.email,
                payment:data.payment,
                status:data.status,
                DeliveredDate:null,
                quantity:data.quantity,
                bookName:data.bookName,
                author:data.author,
                razorPayId:data.razorPayId
            });
    
            return order;
        } catch (error) {
            console.log('error creating order', error);
            throw error;
        }


    }
    async getOrders(userId){
        try {
            return await this.databases.listDocuments(conf.DATABASE_ID,conf.COLLECTION_ID_ORDERLIST,[
                Query.search('UserId',userId),
                Query.orderDesc("DateOfOrder")
            ])
        } catch (error) {
            console.log('error getting order list',error)
        }
    }

    async updateUserData(data){
        try {

            return this.databases.updateDocument(conf.DATABASE_ID,conf.COLLECTION_ID_USERDETAILS,data.collectionId,{
                UserId:data.userId,
                email:data.email,
                address:data.address,
                orders:data.orders,
                name:data.name,
                phone:data.phone
            });

        } catch (error) {
            console.log("error creating user",error)
        }
    }
    async getUserById(userid){
        try {
            return this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID_USERDETAILS,
                [
                    Query.search('UserId',userid)
                ]
            );
        } catch (error) {
            throw error;
        }
    }

}
const service = new Service()
export default service
