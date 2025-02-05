import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // تحميل متغيرات البيئة

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(cors()); // السماح بطلبات من مصادر خارجية

app.post("/interpret-dream", async (req, res) => {
    try {
        const { dream } = req.body;

        if (!dream) {
            return res.status(400).json({ error: "يرجى إدخال الحلم" });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: `فسر لي هذا الحلم: ${dream}` }]
        });

        res.json({ interpretation: completion.choices[0].message.content });

    } catch (error) {
        console.error("حدث خطأ:", error);
        res.status(500).json({ error: "حدث خطأ أثناء الاتصال بـ OpenAI" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`));

import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config(); // تحميل متغيرات البيئة

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // تأكد أن المفتاح يتم تحميله بشكل صحيح
});

console.log("🔑 مفتاح API:", process.env.OPENAI_API_KEY);

