document.getElementById('interpretBtn').addEventListener('click', async function() {
    const dreamInput = document.getElementById('dreamInput').value;
    if (!dreamInput.trim()) {
        alert('يرجى كتابة حلمك أولاً.');
        return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>جاري تفسير الحلم...</p>';

    try {
        // إرسال طلب إلى الخادم باستخدام fetch
        const response = await fetch('http://localhost:3000/interpret-dream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dream: dreamInput }),
        });

        const data = await response.json();
        if (data.interpretation) {
            resultDiv.innerHTML = `<h3>التفسير:</h3><p>${data.interpretation}</p>`;
        } else {
            resultDiv.innerHTML = '<p>لم يتم العثور على تفسير لهذا الحلم.</p>';
        }
    } catch (error) {
        console.error('خطأ في الاتصال بالخادم:', error);
        resultDiv.innerHTML = '<p>حدث خطأ أثناء تفسير الحلم. يرجى المحاولة مرة أخرى.</p>';
    }
});
