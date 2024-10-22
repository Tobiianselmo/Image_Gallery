// gallery.js

const accessKey = 'qU5_jEzEA67Pnj60WiJul9c9_Xl-1-4QD2_NtwBYoNw';

// Cuando el usuario realice una búsqueda
document.querySelector('.buscador-button').addEventListener('click', () => {
    const query = document.querySelector('.buscador-input').value;

    if (query) {
        fetchPhotos(query); // Realiza la búsqueda con la API de Unsplash
    }
});

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

        const favButton = document.createElement('button');
        favButton.textContent = '🤍';
        favButton.className = 'fav-button';
        favButton.addEventListener('click', () => addToFavorites(photo));

        const photoContainer = document.createElement('div');
        photoContainer.className = 'photo-container';
        photoContainer.appendChild(imgElement);
        photoContainer.appendChild(favButton);

        gallery.appendChild(photoContainer);
    });
}

function addToFavorites(photo) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Evitar duplicados
    if (!favorites.some(fav => fav.id === photo.id)) {
        favorites.push(photo);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
        alert('Esta foto ya está en favoritos');
    }
}

