const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// استخدام Express لتقديم ملفات HTML وCSS وJavaScript
app.use(express.static(path.join(__dirname, 'public'))); // مجلد يحتوي على ملفات HTML, CSS, JS

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`خادم يعمل على http://localhost:${port}`);
});
