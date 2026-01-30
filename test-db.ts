import { db } from './src/lib/db';

async function main() {
    try {
        const categories = await db.category.findMany();
        console.log('Successfully connected to DB. Categories found:', categories.length);
        const messages = await db.contactMessage.findMany();
        console.log('Contact messages found:', messages.length);
    } catch (error) {
        console.error('ERROR connecting to DB:', error);
    } finally {
        process.exit();
    }
}

main();
