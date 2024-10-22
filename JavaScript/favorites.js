// Función para mostrar fotos en la galería de favoritos
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesGallery = document.getElementById('favorites-gallery');
    favoritesGallery.innerHTML = ''; // Limpiar la galería antes de mostrar nuevas fotos

    favorites.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.urls.small;
        imgElement.alt = photo.alt_description;
        imgElement.className = 'gallery-photo';

        const removeButton = document.createElement('button');
        removeButton.textContent = '✖️';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', () => removeFromFavorites(photo.id));

        const photoContainer = document.createElement('div');
        photoContainer.className = 'photo-container';
        photoContainer.appendChild(imgElement);
        photoContainer.appendChild(removeButton);

        favoritesGallery.appendChild(photoContainer);
    });
}

// Función para eliminar una foto de los favoritos
function removeFromFavorites(photoId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.id !== photoId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites(); // Vuelve a mostrar los favoritos actualizados
}

// Cargar los favoritos al cargar la página
document.addEventListener('DOMContentLoaded', displayFavorites);
