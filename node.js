import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // تحميل البيئة من ملف .env

// تهيئة مكتبة OpenAI باستخدام مفتاح API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// دالة تفسير الحلم
export async function interpretDream(dream) {
  try {
    // الاتصال بـ OpenAI API للحصول على تفسير الحلم
    const completion = await openai.chat.completions.create({
      model: 'gpt-4', // يمكنك استخدام gpt-3.5 أو أي موديل آخر حسب الحاجة
      messages: [{ role: 'user', content: `فسر لي هذا الحلم: ${dream}` }],
    });

    // إرجاع التفسير الذي توفره OpenAI
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('حدث خطأ أثناء الاتصال بـ OpenAI:', error);
    throw error; // إلقاء الخطأ إذا فشل الاتصال
  }
}
