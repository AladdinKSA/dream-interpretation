async function interpretDream() {
    const dreamInput = document.getElementById("dreamInput").value;
    const messageDiv = document.getElementById("message");
    const loader = document.getElementById("loader");

    // إظهار المحاكي أثناء التحميل
    loader.style.display = "block";
    messageDiv.innerHTML = ""; // مسح الرسائل السابقة

    // تحقق من الحلم
    if (dreamInput.trim() === "") {
        loader.style.display = "none";
        messageDiv.innerHTML = "<p class='error-message'>يرجى إدخال حلمك أولاً.</p>";
        return;
    }

    // استدعاء API لتفسير الحلم

/* curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
    "model": "gpt-4o-mini",
    "store": true,
  messages: [{ role: "user", content: "فسر لي هذا الحلم: " + dreamInput }],
    ]
  }'*/


    
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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`
            },
            body: JSON.stringify({
 "model": "gpt-4o-mini",
 messages: [{ role: "user", content: "فسر لي هذا الحلم: " + dreamInput }],
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        loader.style.display = "none"; // إخفاء المحاكي
        
        if (data.choices && data.choices.length > 0) {
            messageDiv.innerHTML = `<p class='success-message'>تفسير حلمك: ${data.choices[0].message.content}</p>`;
        } else {
            messageDiv.innerHTML = "<p class='error-message'>عذراً، لم يتم العثور على تفسير لهذا الحلم.</p>";
        }
    } catch (error) {
        loader.style.display = "none";
        messageDiv.innerHTML = "<p class='error-message'>حدث خطأ أثناء تفسير الحلم، يرجى المحاولة لاحقاً.</p>";
    }
}
