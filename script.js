document.getElementById('interpretBtn').addEventListener('click', async function() {
    const dreamInput = document.getElementById('dreamInput').value;
    if (!dreamInput.trim()) {
        alert('يرجى كتابة حلمك أولاً.');
        return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>جاري تفسير الحلم...</p>';

    const apiKey = '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';  // ضع هنا الـ API Key الخاص بك من OpenAI
    const url = 'https://api.openai.com/v1/completions';

    const requestBody = {
        model: 'text-davinci-003',  // استخدام نموذج Davinci أو أي نموذج مناسب آخر
        prompt: `تفسير هذا الحلم: ${dreamInput}`,
        max_tokens: 150,
        temperature: 0.7
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            resultDiv.innerHTML = `<h3>التفسير:</h3><p>${data.choices[0].text}</p>`;
        } else {
            resultDiv.innerHTML = '<p>لم يتم العثور على تفسير لهذا الحلم.</p>';
        }
    } catch (error) {
        console.error('خطأ في الاتصال بالـ API:', error);
        resultDiv.innerHTML = '<p>حدث خطأ أثناء تفسير الحلم. يرجى المحاولة مرة أخرى.</p>';
    }
});
