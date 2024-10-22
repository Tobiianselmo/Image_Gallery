// auth.js

// Guardar credenciales de OAuth obtenidas desde Unsplash
const clientId = 'qU5_jEzEA67Pnj60WiJul9c9_Xl-1-4QD2_NtwBYoNw';
const redirectUri = 'http://127.0.0.1:5500/login.html';

// URL de autenticación para redirigir al usuario a Unsplash
const authUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public+read_user`;

// Función para redirigir a Unsplash para iniciar sesión
function redirectToAuth() {
    window.location.href = authUrl;
}

// Cuando el usuario haga clic en el botón de "Login" llamamos a esta función
document.getElementById('loginButton').addEventListener('click', redirectToAuth);

// Función para obtener el parámetro 'code' de la URL
function getAuthCode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
}

async function exchangeCodeForToken(authCode) {
    const tokenUrl = 'https://unsplash.com/oauth/token';
    const body = new URLSearchParams({
        client_id: clientId,
        client_secret: 'lCDQWnsqgQEDM6di7f1qQ5F1z8853wVOcijfBf3Of6c',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code: authCode
    });

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        const data = await response.json();

        if (response.ok) {
            // Guarda el token de acceso en localStorage
            localStorage.setItem('accessToken', data.access_token);
            console.log('Token de acceso recibido:', data.access_token);
            // Redirigir al usuario a la página principal
            window.location.href = 'index.html';
        } else {
            console.error('Error al obtener el token:', data); // Detalles del error
        }
    } catch (error) {
        console.error('Error en la solicitud de token:', error);
    }
}

// Verificamos si el usuario ha sido redirigido con un código de autorización
const authCode = getAuthCode();

if (authCode) {
    exchangeCodeForToken(authCode); // Intercambiar el código por un token
}