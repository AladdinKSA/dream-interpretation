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
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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`
            },
            body: JSON.stringify({
                model: "gpt-4",
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
