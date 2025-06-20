import packageJson from '../../package.json'

// สร้างค่าคงที่สำหรับการตั้งค่าของระบบ
export const APP_CONFIG = {
    appName: "BookGeek", // ชื่อของระบบ
    version: packageJson.version, // รุ่นของระบบ
    meta: {
        title: "BookGeek", // ชื่อของระบบ
        description: "This is a booking app built with Next.js",
        keywords: ["booking", "app", "nextjs", "react"],
    }
}