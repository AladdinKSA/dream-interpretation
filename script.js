document.addEventListener("DOMContentLoaded", () => {
    // تحديد العناصر من صفحة HTML
    const dreamInput = document.getElementById("dream-input");
    const interpretBtn = document.getElementById("interpret-btn");
    const resultDiv = document.getElementById("result");

    // عند الضغط على زر "تفسير الحلم"
    interpretBtn.addEventListener("click", async () => {
        const dream = dreamInput.value.trim();

        if (!dream) {
            resultDiv.innerText = "🚨 الرجاء إدخال حلمك أولًا.";
            return;
        }

        resultDiv.innerText = "⏳ جارٍ تفسير الحلم...";

        try {
            const response = await fetch("http://localhost:3000/interpret-dream", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dream })
            });

            if (!response.ok) {
                throw new Error("❌ فشل في الاتصال بالخادم.");
            }

            const data = await response.json();
            resultDiv.innerText = "📜 التفسير: " + data.interpretation;
        } catch (error) {
            console.error("حدث خطأ:", error);
            resultDiv.innerText = "❌ حدث خطأ أثناء تفسير الحلم. حاول مرة أخرى.";
        }
    });
});
