// استيراد المكتبات المطلوبة
const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// تحميل المتغيرات البيئية من ملف .env
dotenv.config();

// إنشاء تطبيق Express
const app = express();

// إعدادات التطبيق
app.use(express.static('public'));
app.use(express.json());

// نقطة النهاية للتفسير
app.post('/interpret', async (req, res) => {
    const { dream } = req.body;

    if (!dream) {
        return res.status(400).json({ error: 'يرجى إدخال حلمك أولاً.' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `تفسير الحلم التالي: ${dream}`,
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        const data = await response.json();

        if (data.choices && data.choices[0].text) {
            res.json({ interpretation: data.choices[0].text.trim() });
        } else {
            res.status(500).json({ error: 'لم يتم العثور على تفسير لهذا الحلم.' });
        }
    } catch (error) {
        console.error('حدث خطأ:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء تفسير الحلم.' });
    }
});

// تشغيل الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
