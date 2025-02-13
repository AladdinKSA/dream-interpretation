require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());
const path = require('path');

// تحديد المسار الثابت
app.use(express.static(path.join(__dirname, 'public')));

// نقطة النهاية للصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


%pip install openai
import os
from openai import OpenAI

client = OpenAI (api Key: "36c33ba0789448d89ee6fbb9bc7ac280",
  baseURL: "https://api.aimlapi.com/v1")

app.post('/interpret', async (req, res) => {
  const { dream } = req.body;

  if (!dream) {
    return res.status(400).json({ error: 'يرجى إدخال حلمك أولاً.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'أنت مفسر أحلام. كن وصفيًا ومساعدًا.' },
        { role: 'user', content: dream },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });
 const response = completion.choices[0].message.content;
      console.log("الحلم:", dream);
console.log("التفسير :", response);
    const interpretation = completion.choices[0].message.content.trim();
    res.json({ interpretation });
  } catch (error) {
    console.error('حدث خطأ:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء تفسير الحلم.' });
  }
});
const api = new OpenAI({
  apiKey,
  baseURL,
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
