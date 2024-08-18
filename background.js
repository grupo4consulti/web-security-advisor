chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyzeSecurity") {
    const { url } = request;
    console.log("Received URL for analysis:", url);

    // 1. Validar si la URL es HTTP o HTTPS
    const isHttps = new URL(url).protocol === 'https:';
    if (!isHttps) {
      console.log("Insecure URL detected: HTTP");
      showAlert("Página insegura: La URL usa HTTP.");
      return;
    }

    // 2. Obtener cookies y analizar datos sensibles
    console.log("Analyzing cookies for URL:", url);
    chrome.cookies.getAll({ url: url }, (cookies) => {
      console.log("Cookies retrieved:", cookies);
      let sensitiveDataCollected = false;

      cookies.forEach(cookie => {
        if (cookie.name.includes("location") || cookie.name.includes("geo")) {
          sensitiveDataCollected = true;
        }
      });

      console.log("Sensitive data collected:", sensitiveDataCollected);

      // 3. Validar el certificado SSL mediante fetch
      validateSSL(url, sensitiveDataCollected);
    });
  }
});

function validateSSL(url, sensitiveDataCollected) {
  console.log("Validating SSL for URL:", url);
  fetch(url, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        console.log("SSL validation passed.");
        // SSL parece válido; Continuar con la evaluación
        evaluateSecurity(url, true, sensitiveDataCollected);
      } else {
        console.log("SSL validation failed.");
        showAlert("Página insegura: Posible problema con el certificado SSL.");
      }
    })
    .catch(error => {
      console.log("Error during SSL validation:", error);
      showAlert("Página insegura: No se pudo validar el certificado SSL.");
    });
}

function evaluateSecurity(url, isValidSSL, sensitiveDataCollected) {
  console.log("Evaluating security using GPT-4o API.");
  const apiKey = "API_KEY";

  const requestBody = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "Evalúa la seguridad de la página basada en los siguientes parámetros. Solo debes responder con un mensaje corto indicando si la página es segura o no. Si es segura, debes indicar de forma muy breve por qué es segura. Si no es segura, además de indicar que no es segura, debes indicar de forma muy breve el motivo. En ninguno de los casos tu respuesta puede exceder de 25 palabras. Adicionalmente la respuesta debe tener dos oraciones: una que indique si la página es segura o no y otra que indique por qué."
      },
      {
        role: "user",
        content: JSON.stringify({
          url: url,
          ssl: isValidSSL,
          sensitiveDataCollected: sensitiveDataCollected
        })
      }
    ]
  };

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      console.log("GPT-4 API response received:", data);
      const result = data.choices[0].message.content;
      showAlert(result);
    })
    .catch(error => {
      console.error("Error al consumir la API:", error);
    });
}

function showAlert(message) {
  console.log("Showing alert with message:", message);
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'Seguridad de la página',
    message: message
  });
}
