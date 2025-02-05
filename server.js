import express from 'express';
import dotenv from 'dotenv';
import { interpretDream } from './node.js'; // استيراد الدالة من ملف node.js

dotenv.config();

const app = express();
app.use(express.json()); // لتفسير بيانات JSON من جسم الطلب

// نقطة النهاية للتفسير
app.post('/interpret', async (req, res) => {
  const { dream } = req.body; // الحصول على الحلم من الجسم
  try {
    const interpretation = await interpretDream(dream); // استدعاء دالة التفسير من node.js
    res.json({ interpretation }); // إرسال النتيجة للمستخدم
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'حدث خطأ في تفسير الحلم' });
  }
});

// تشغيل الخادم على المنفذ 3000
app.listen(3000, () => {
  console.log('خادم يعمل على المنفذ 3000');
});
