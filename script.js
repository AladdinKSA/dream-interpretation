document.getElementById('dreamForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const dreamText = document.getElementById('dreamInput').value;
const apiKey = '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';


  // إظهار مؤشر التحميل
  loadingIndicator.style.display = 'block';
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
        },
       body: JSON.stringify({ dream: dreamText }),
       
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
  
