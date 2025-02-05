import dotenv from 'dotenv';
import { OpenAI } from 'openai';

// قم بتحميل البيئة من ملف .env
dotenv.config();

// تهيئة مكتبة OpenAI باستخدام API Key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// دالة لتفسير الحلم
async function interpretDream(dream) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "user", content: `فسر لي هذا الحلم: ${dream}` }
      ]
    });
    
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error("حدث خطأ أثناء الاتصال بـ OpenAI:", error);
  }
}

// مثال لاستخدام الدالة مع حلم معين
interpretDream("أنا حلمت بأنني أسبح في البحر أمام شاطئ هادئ.");
