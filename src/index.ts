import app from './app';
import { AppDataSource } from './db/connection';
import { createClient } from 'redis';

const client = createClient();

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database conected');

        await client.connect();
        app.listen(3000, () => {
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