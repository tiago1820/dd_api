import { MongoClient, Db } from "mongodb";
import { USER_MDB, PASS_MDB, SERVER_MDB } from "../constants";

class MongoDBConnection {
    private client: MongoClient;
    public db?: Db;

    constructor() {
        const queryString = `mongodb+srv://${USER_MDB}:${PASS_MDB}@${SERVER_MDB}/?retryWrites=true&w=majority&appName=Reformers`;
        this.client = new MongoClient(queryString);
    }

    async connectDB() {
        try {
            await this.client.connect();
            this.db = this.client.db("reformersLogs");
        } catch (error) {
            console.log("Error connecting to MongoDB:", error);
        }
    }
}

export default new MongoDBConnection();