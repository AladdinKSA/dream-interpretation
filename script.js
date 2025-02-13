document.getElementById('dreamForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const dreamText = document.getElementById('dreamInput').value;
  
    try {
      const response = await fetch('https://api.aimlapi.com/v1', {
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
    interpretationDiv.textContent = `التفسير: ${data.interpretation}`;
    interpretationDiv.style.display = 'block';
      //document.getElementById('interpretation').textContent = `التفسير: ${data.interpretation}`;
    } catch (error) {
      console.error('حدث خطأ:', error);
      //document.getElementById('interpretation').textContent = 'حدث خطأ أثناء تفسير الحلم.';
      const interpretationDiv = document.getElementById('interpretation');
    interpretationDiv.textContent = 'حدث خطأ أثناء تفسير الحلم.';
    interpretationDiv.style.display = 'block';
    }
  });
  
