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


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.aimlapi.com/v1',
});

app.post('/interpret', async (req, res) => {
  const { dream } = req.body;

  if (!dream) {
    return res.status(400).json({ error: 'يرجى إدخال حلمك أولاً.' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      messages: [
        { role: 'system', content: 'أنت مفسر أحلام. كن وصفيًا ومساعدًا.' },
        { role: 'user', content: dream },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const interpretation = response.choices[0].message.content.trim();
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
