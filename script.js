async function interpretDream() {

    let dream = document.getElementById("dreamInput").value;

    if (dream.trim() === "") {

        alert("يرجى إدخال الحلم قبل التفسير.");

        return;

    }



    let apiKey = "sk-proj-qAPZbjzZujkpnCfmujPHICLrqjsk-proj-JPJGWA7g6xLJK492tvvj-igsQKvqK9kjY3sapUcyTCS9X0Efus0uCkMNc-V30DA3DLfudXbrlmT3BlbkFJJg2ja72Kx62hB_ozTzR_7ccZ8S_PUHo1-LMLuVKRmR17RF13XoBlSHUDMkdbHHq6Hl4BTE5qYA"; // ضع مفتاح API هنا

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

