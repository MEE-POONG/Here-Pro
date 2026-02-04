import { db } from './src/lib/db';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
    try {
        const email = "admin@here-pro.com";
        const password = "admin123"; // เปลี่ยนรหัสผ่านนี้ในโปรดักชัน!

        // Check if admin already exists
        const existing = await db.user.findUnique({
            where: { email }
        });

        if (existing) {
            console.log('❌ Admin user already exists!');
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const admin = await db.user.create({
            data: {
                name: "Super Admin",
                email: email,
                password: hashedPassword,
                role: "admin"
            }
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email:', email);
        console.log('🔑 Password:', password);
        console.log('⚠️  Please change the password after first login!');
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    } finally {
        await db.$disconnect();
    }
}

createAdminUser();
