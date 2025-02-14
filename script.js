document.getElementById('dreamForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const dreamText = document.getElementById('dreamInput').value;
/*const cors = require('cors');*/

const corsOptions = {
  origin: 'https://aladdinksa.github.io',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};

  // إظهار مؤشر التحميل
  loadingIndicator.style.display = 'block';
  
    try {
   
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
    'Authorization': `Bearer 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`,
        },
       body: JSON.stringify({  model: 'gpt-4o-mini', // أو أي نموذج آخر ترغب في استخدامه
    messages: [
      { role: 'system', content: 'أنت مفسر احلام فضلا قم بتفسير هذا الحلم حسب تفسيرات ابن سيرين.' },
      { role: 'user', content: dreamText },
    ],
    temperature: 0.7,
    max_tokens: 256, }),
       
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const interpretationDiv = document.getElementById('interpretation');
    interpretationDiv.textContent = ` ${data.interpretation}`;
    // إخفاء مؤشر التحميل
    loadingIndicator.style.display = 'none';
    interpretationDiv.style.display = 'block';
      //document.getElementById('interpretation').textContent = `التفسير: ${data.interpretation}`;
    } catch (error) {
      console.error('حدث خطأ:', error);
      //document.getElementById('interpretation').textContent = 'حدث خطأ أثناء تفسير الحلم.';
      const interpretationDiv = document.getElementById('interpretation');
    interpretationDiv.textContent = 'حدث خطأ أثناء تفسير الحلم.';
    loadingIndicator.style.display = 'none';
    interpretationDiv.style.display = 'block';
    }
    /*finally {
        // إخفاء مؤشر التحميل
        loadingIndicator.style.display = 'none';
        // عرض حقل التفسير
        interpretationDiv.style.display = 'block';
      }*/
  });
  
