document.getElementById("interpret-btn").addEventListener("click", async () => {
    const dream = document.getElementById("dream-input").value;
    
    if (!dream) {
        alert("يرجى إدخال حلمك!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/interpret-dream", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dream })
        });

        const data = await response.json();
        document.getElementById("result").innerText = data.interpretation || "تعذر تفسير الحلم";
    } catch (error) {
        console.error("حدث خطأ:", error);
        document.getElementById("result").innerText = "خطأ في الاتصال بالخادم!";
    }
});



