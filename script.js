document.getElementById('dreamForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const dreamText = document.getElementById('dreamInput').value;


  // إظهار مؤشر التحميل
  loadingIndicator.style.display = 'block';
  
    try {
      const response = await fetch('http://localhost:3000/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
  