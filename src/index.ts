import app from './app';
import { AppDataSource } from './db/conection';

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database conected');
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