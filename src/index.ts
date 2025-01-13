import app from './app';
import { AppDataSource } from './databases/connection';
import { createClient } from 'redis';
import mongodbConnection from './databases/mongodb.connection';

const client = createClient();

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('MySQL conected');

        await client.connect();
        console.log('Redis conected');

        await mongodbConnection.connectDB();
        console.log('MongoDB conected');

        app.listen(3001, () => {
            console.log('Server conected');
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

main();
export { client };