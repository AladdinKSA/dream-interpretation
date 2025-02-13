document.addEventListener('DOMContentLoaded', () => {
  const dreamForm = document.getElementById('dreamForm');
  const interpretationDiv = document.getElementById('interpretation');

  if (dreamForm) {
    dreamForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const dreamText = document.getElementById('dreamInput').value;

      // التحقق من وجود نص الحلم
      if (!dreamText.trim()) {
        interpretationDiv.textContent = 'يرجى إدخال نص الحلم.';
        interpretationDiv.style.display = 'block';
        return;
      }

      // عرض مؤشر التحميل
      interpretationDiv.textContent = 'جارٍ معالجة الحلم...';
      interpretationDiv.style.display = 'block';

      try {
        const response = await fetch('https://api.aimlapi.com/chat/completions', {
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

        // التحقق من وجود التفسير في الاستجابة
        if (data && data.interpretation) {
          interpretationDiv.textContent = `التفسير: ${data.interpretation}`;
        } else {
          interpretationDiv.textContent = 'لم يتم العثور على تفسير لهذا الحلم.';
        }
      } catch (error) {
        console.error('حدث خطأ:', error);
        interpretationDiv.textContent = 'حدث خطأ أثناء تفسير الحلم.';
      }
    });
  } else {
    console.error('لم يتم العثور على العنصر dreamForm.');
  }
});
