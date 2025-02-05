import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // تحميل ملف .env

const app = express();
app.use(express.json());
app.use(cors()); // السماح بالطلبات من `script.js`

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // تحميل مفتاح API بشكل آمن
});

app.post("/interpret-dream", async (req, res) => {
    try {
        const userPrompt = req.body.dream; // الحلم الذي كتبه المستخدم

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: userPrompt }],
        });

        res.json({ interpretation: completion.choices[0].message.content });
    } catch (error) {
        console.error("خطأ في استدعاء OpenAI:", error);
        res.status(500).json({ error: "حدث خطأ أثناء تفسير الحلم." });
    }
});

app.listen(3000, () => console.log("🚀 الخادم يعمل على http://localhost:3000"));
