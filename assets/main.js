async function generateWebsite(apiKey, siteType) {
    const prompt = `أنشئ صفحة HTML كاملة لموقع ${siteType}، تشمل العنوان، الوصف، الأقسام والتصميم الأساسي.`;
    const body = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "حدث خطأ، تحقق من المفتاح أو المدخلات.";
}

document.getElementById("siteForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const apiKey = document.getElementById("apiKey").value.trim();
    const siteType = document.getElementById("siteType").value.trim();

    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "⏳ جاري التوليد...";

    const content = await generateWebsite(apiKey, siteType);
    resultDiv.innerHTML = content;
});
