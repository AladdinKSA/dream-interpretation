async function interpretDream() {

    let dream = document.getElementById("dreamInput").value;

    if (dream.trim() === "") {

        alert("يرجى إدخال الحلم قبل التفسير.");

        return;

    }



    let apiKey = "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"; // ضع مفتاح API هنا

    let response = await fetch("https://api.openai.com/v1/chat/completions", {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            "Authorization": `Bearer ${apiKey}`

        },

        body: JSON.stringify({

            model: "gpt-4",

            messages: [{ role: "user", content: "فسر لي هذا الحلم: " + dream }],

            temperature: 0.7

        })

    });



    let data = await response.json();

    document.getElementById("result").innerText = data.choices[0].message.content;

}

