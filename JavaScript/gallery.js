// gallery.js

const accessKey = 'qU5_jEzEA67Pnj60WiJul9c9_Xl-1-4QD2_NtwBYoNw';

// Función para buscar fotos en Unsplash
async function fetchPhotos(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Llamamos a la función para mostrar las fotos
        displayPhotos(data.results);
    } catch (error) {
        console.error('Error al obtener fotos:', error);
    }
}

// Función para mostrar fotos en la galería
function displayPhotos(photos) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Limpiar la galería antes de mostrar nuevas fotos

    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.urls.small;
        imgElement.alt = photo.alt_description;
        imgElement.className = 'gallery-photo';

        gallery.appendChild(imgElement);
    });
}

// Cuando el usuario realice una búsqueda
document.querySelector('.buscador-button').addEventListener('click', () => {
    const query = document.querySelector('.buscador-input').value;

    if (query) {
        fetchPhotos(query); // Realiza la búsqueda con la API de Unsplash
    }
});
