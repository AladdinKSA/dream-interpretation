import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

// تحميل المتغيرات البيئية من ملف .env
dotenv.config();

// تهيئة التطبيق باستخدام Express
const app = express();
app.use(express.json());
app.use(cors()); // السماح بالطلبات من `script.js`

// التأكد من وجود مفتاح API
if (!process.env.OPENAI_API_KEY) {
    console.error("❌ خطأ: تأكد من وجود مفتاح API في ملف .env");
    process.exit(1); // إيقاف الخادم
}

// تهيئة OpenAI باستخدام المفتاح
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
console.log("🔑 مفتاح API:", process.env.OPENAI_API_KEY);

// نقطة النهاية لاستقبال الأحلام من المستخدم وإرسالها إلى OpenAI
app.post("/interpret-dream", async (req, res) => {
    try {
        const userPrompt = req.body.dream; // جلب الحلم من الطلب

        if (!userPrompt) {
            return res.status(400).json({ error: "🚨 الرجاء إدخال حلم صحيح." });
        }

        // إرسال الطلب إلى OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: `فسر لي هذا الحلم: ${userPrompt}` }],
        });

        // إرسال النتيجة للمستخدم
        res.json({ interpretation: completion.choices[0].message.content });
    } catch (error) {
        console.error("❌ خطأ أثناء الاتصال بـ OpenAI:", error);
        res.status(500).json({ error: "❌ حدث خطأ أثناء تفسير الحلم. حاول لاحقًا." });
    }
});

// تشغيل الخادم على المنفذ 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`));
