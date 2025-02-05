import express from "express";
import { OpenAI } from "openai"; // استيراد مكتبة OpenAI
import cors from "cors"; // لتسهيل العمل مع المتصفحات
import bodyParser from "body-parser"; // لتحليل البيانات المرسلة عبر POST

const app = express();
const port = 3000;

// إعدادات CORS للسماح للصفحة بالاتصال بالخادم
app.use(cors());

// إعدادات body-parser لمعالجة طلبات POST
app.use(bodyParser.json());

// إعداد OpenAI API
const openai = new OpenAI({
    apiKey: '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', // ضع هنا الـ API Key الخاص بك
});

// نقطة النهاية لتفسير الأحلام
app.post("/interpret-dream", async (req, res) => {
    const { dream } = req.body;

    try {
        // إرسال الطلب إلى OpenAI API لتفسير الحلم
        const completion = await openai.chat.completions.create({
            model: "gpt-4", // استخدم النموذج المناسب (مثل gpt-4 أو gpt-3.5)
            messages: [
                {
                    role: "user",
                    content: `تفسير هذا الحلم: ${dream}`,
                },
            ],
        });

        // إرسال التفسير المستلم من API
        res.json({ interpretation: completion.choices[0].message.content });
    } catch (error) {
        console.error('حدث خطأ أثناء تفسير الحلم:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء تفسير الحلم' });
    }
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`الخادم يعمل على http://localhost:${port}`);
});
