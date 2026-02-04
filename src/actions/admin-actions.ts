"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- Products ---
export async function getProducts() {
    try {
        const products = await db.product.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' },
        });
        return products.map(product => ({
            ...product,
            price: Number(product.price)
        }));
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

// Get only active products (for frontend display)
export async function getActiveProducts() {
    try {
        const products = await db.product.findMany({
            where: { isActive: true },
            include: { category: true },
            orderBy: { createdAt: 'desc' },
        });
        return products.map(product => ({
            ...product,
            price: Number(product.price)
        }));
    } catch (error) {
        console.error("Error fetching active products:", error);
        return [];
    }
}

export async function getProduct(id: string) {
    try {
        const product = await db.product.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!product) return null;
        return {
            ...product,
            price: Number(product.price)
        };
    } catch {
        return null;
    }
}

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

async function saveFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) {
        // Ignore if exists
    }

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);
    return `/uploads/${filename}`;
}

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = 0; // Default price since it's not used
    const categoryId = formData.get("categoryId") as string;
    const featured = formData.get("featured") === "on";
    const benefits = (formData.get("benefits") as string || "").split('\n').filter(b => b.trim() !== "");

    const imageFile = formData.get("image") as File;
    let imagePath = "";

    if (imageFile && imageFile.size > 0) {
        imagePath = await saveFile(imageFile);
    } else {
        // Fallback if they pasted a URL string (though UI will be file input mostly)
        // or just empty
    }

    if (!categoryId) {
        throw new Error("Category is required");
    }

    await db.product.create({
        data: {
            name,
            description,
            price,
            image: imagePath,
            featured,
            benefits,
            category: {
                connect: { id: categoryId }
            }
        }
    });
    revalidatePath('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = 0; // Default price since it's not used
    const categoryId = formData.get("categoryId") as string;
    const featured = formData.get("featured") === "on";
    const benefits = (formData.get("benefits") as string || "").split('\n').filter(b => b.trim() !== "");

    const imageFile = formData.get("image") as File;
    let imagePath = undefined;

    if (imageFile && imageFile.size > 0) {
        imagePath = await saveFile(imageFile);
    }

    await db.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            ...(imagePath && { image: imagePath }), // Only update image if new one provided
            featured,
            benefits,
            categoryId // Direct update works fine too, but let's be consistent if we want
        }
    });
    revalidatePath('/admin/products');
}

export async function deleteProduct(id: string) {
    await db.product.delete({ where: { id } });
    revalidatePath('/admin/products');
}

export async function toggleProductActive(id: string) {
    const product = await db.product.findUnique({ where: { id } });
    if (!product) return;

    await db.product.update({
        where: { id },
        data: { isActive: !product.isActive }
    });
    revalidatePath('/admin/products');
    revalidatePath('/');
}

// --- Banners ---
export async function getBanners() {
    try {
        return await db.banner.findMany({ orderBy: { order: 'asc' } });
    } catch {
        return [];
    }
}

export async function createBanner(formData: FormData) {
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const badge = formData.get("badge") as string;
    const active = formData.get("active") === "on";

    const imageFile = formData.get("image") as File;
    let imagePath = "";

    if (imageFile && imageFile.size > 0) {
        imagePath = await saveFile(imageFile);
    }

    // Get max order to append
    const lastBanner = await db.banner.findFirst({ orderBy: { order: 'desc' } });
    const order = (lastBanner?.order ?? 0) + 1;

    await db.banner.create({
        data: { title, subtitle, badge, image: imagePath, active, order }
    });
    revalidatePath('/');
    revalidatePath('/admin/banners');
}

export async function updateBanner(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const badge = formData.get("badge") as string;
    const active = formData.get("active") === "on";

    const imageFile = formData.get("image") as File;
    let imagePath = undefined;

    if (imageFile && imageFile.size > 0) {
        imagePath = await saveFile(imageFile);
    }

    await db.banner.update({
        where: { id },
        data: {
            title,
            subtitle,
            badge,
            ...(imagePath && { image: imagePath }),
            active
        }
    });
    revalidatePath('/');
    revalidatePath('/admin/banners');
}

export async function deleteBanner(id: string) {
    await db.banner.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/banners');
}

// --- Categories ---
export async function getCategories() {
    try {
        return await db.category.findMany({ orderBy: { name: 'asc' } });
    } catch {
        return [];
    }
}

export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/ /g, '-');
    const description = formData.get("description") as string;

    await db.category.create({
        data: { name, slug, description }
    });
    revalidatePath('/admin/categories');
}

export async function deleteCategory(id: string) {
    await db.category.delete({ where: { id } });
    revalidatePath('/admin/categories');
}

// --- Users ---
export async function getUsers() {
    try {
        return await db.user.findMany({ orderBy: { createdAt: 'desc' } });
    } catch {
        return [];
    }
}

export async function createUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string; // Note: Should hash password in real app
    const role = formData.get("role") as string;

    await db.user.create({
        data: { name, email, password, role }
    });
    revalidatePath('/admin/users');
}

export async function updateUser(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    const data: any = { name, email, role };
    if (password && password.trim() !== "") {
        data.password = password; // Should hash in production
    }

    await db.user.update({
        where: { id },
        data
    });
    revalidatePath('/admin/users');
}

export async function deleteUser(id: string) {
    await db.user.delete({ where: { id } });
    revalidatePath('/admin/users');
}

// --- Contact Messages ---
export async function createContactMessage(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        console.log("Creating contact message:", { name, email, subject });

        const result = await db.contactMessage.create({
            data: { name, email, phone, subject, message }
        });

        console.log("Contact message created successfully:", result.id);
        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error: any) {
        console.error("FAILED to create contact message:", error);
        throw new Error(error.message || "Failed to send message");
    }
}

export async function getContactMessages() {
    try {
        return await db.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    } catch {
        return [];
    }
}

export async function deleteContactMessage(id: string) {
    await db.contactMessage.delete({ where: { id } });
    revalidatePath('/admin/messages');
}

export async function markMessageAsRead(id: string) {
    await db.contactMessage.update({
        where: { id },
        data: { isRead: true }
    });
    revalidatePath('/admin/messages');
}

// --- Stats ---
export async function getStats() {
    try {
        const [productCount, categoryCount, userCount, visitStat, unreadCount] = await Promise.all([
            db.product.count(),
            db.category.count(),
            db.user.count(),
            db.globalStat.findUnique({ where: { key: 'total_visits' } }),
            db.contactMessage.count({ where: { isRead: false } })
        ]);
        return {
            productCount,
            categoryCount,
            userCount,
            visitCount: visitStat?.value || 0,
            unreadCount
        };
    } catch {
        return { productCount: 0, categoryCount: 0, userCount: 0, visitCount: 0, unreadCount: 0 };
    }
}

export async function trackVisit() {
    try {
        const now = new Date();
        const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

        await Promise.all([
            db.globalStat.upsert({
                where: { key: 'total_visits' },
                update: { value: { increment: 1 } },
                create: { key: 'total_visits', value: 1 }
            }),
            db.monthlyVisit.upsert({
                where: { month: monthKey },
                update: { count: { increment: 1 } },
                create: { month: monthKey, count: 1 }
            })
        ]);
    } catch (error) {
        console.error("Failed to track visit:", error);
    }
}

export async function getMonthlyVisits() {
    try {
        return await db.monthlyVisit.findMany({
            orderBy: { month: 'asc' },
            take: 12
        });
    } catch {
        return [];
    }
}

// --- Seeding ---
export async function seedInitialData() {
    // Check if category exists
    const count = await db.category.count();
    if (count === 0) {
        await db.category.createMany({
            data: [
                { name: "Medicine", slug: "medicine", description: "Pharmaceutical products" },
                { name: "Supplements", slug: "supplements", description: "Health supplements" },
                { name: "Energy Drink", slug: "energy", description: "Energy boosting drinks" }
            ]
        });

        // Add initial banners
        await db.banner.createMany({
            data: [
                {
                    title: "Innovation for Your Health | นวัตกรรมเพื่อสุขภาพของคุณ",
                    subtitle: "Developing premium products for a better life | มุ่งมั่นพัฒนาผลิตภัณฑ์คุณภาพเพื่อชีวิตที่ดีกว่า",
                    badge: "Best Seller | สินค้ายอดนิยม",
                    image: "/1356cdcaefe2356df18e5ba31f088507.jpg_720x720q80.jpg",
                    active: true,
                    order: 1
                },
                {
                    title: "Certified Manufacturing | มาตรฐานการผลิตระดับโลก",
                    subtitle: "GMP, HACCP, and ISO Certified Factory | โรงงานได้รับมาตรฐานสากล GMP, HACCP และ ISO",
                    badge: "International Standard | มาตรฐานสากล",
                    image: "/uploads/factory-preview.jpg", // Placeholder path or real if exists
                    active: true,
                    order: 2
                }
            ]
        });

        // Add a default admin
        await db.user.create({
            data: {
                name: "Super Admin",
                email: "admin@here-pro.com",
                password: "password123", // In real world this must be hashed
                role: "ADMIN"
            }
        });
    }
    revalidatePath('/');
    revalidatePath('/admin');
}
