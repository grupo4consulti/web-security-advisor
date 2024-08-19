![Logo](logo.jpeg)

# Web Security Advisor

Web Security Advisor es una extensión para Google Chrome diseñada para ayudar a los usuarios a determinar si una página web es segura o no. La extensión analiza varios factores como el tipo de protocolo (HTTP/HTTPS), la validez del certificado SSL, y la información recolectada a través de las cookies. Con estos datos, la extensión utiliza la API de ChatGPT-4 para determinar si la página es segura, mostrando una alerta con el resultado y, en caso de ser insegura, un motivo resumido.

## Características

- Verifica si la página utiliza HTTP o HTTPS.
- Valida la autenticidad y vigencia del certificado SSL.
- Analiza la información de las cookies.
- Integra con la API de ChatGPT-4 para proporcionar un análisis inteligente sobre la seguridad de la página.
- Muestra una alerta con el resultado de la validación de seguridad.

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/grupo4consulti/web-security-advisor.git
    ```

2. Abre Chrome y navega a `chrome://extensions/`.

3. Activa el modo de desarrollador en la esquina superior derecha.

4. Haz clic en "Cargar extensión sin empaquetar" y selecciona la carpeta `web-security-advisor`.

## Uso

1. Navega a cualquier sitio web.
2. Se mostrará una notificación indicando si el sitio web es seguro o no.

## Estructura del Proyecto

- `manifest.json`: Archivo de manifiesto para la extensión de Chrome.
- `background.js`: Script de fondo para manejar eventos en segundo plano.
- `content.js`: Script de contenido que interactúa con las páginas web.
- `popup.html`: Interfaz de usuario de la extensión.
- `popup.js`: Lógica asociada a la interfaz de usuario.
- `icon*.png`: Iconos utilizados por la extensión.

## Autor

Emilio Flores
Edwin Caiza

