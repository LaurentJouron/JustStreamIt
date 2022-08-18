////////////////
// BEST MOVIE //
////////////////

// Fuction to fill the category of best film
// Title
function bestBoxeTitle(data, parent) {
    let newTitle = document.createElement('h1');
    newTitle.className = 'best_movie--title';
    newTitle.textContent = data.title;
    parent.appendChild(newTitle);
}
// Picture
function bestBoxePicture(data, parent) {
    let newPicture = document.createElement('img');
    newPicture.className = 'best_movie--picture';
    newPicture.src = data.image_url;
    parent.appendChild(newPicture);
}
// Play button
function bestBoxePlayButton(parent) {
    let newMoreInformation = document.createElement('button');
    newMoreInformation.className = 'best_movie--play';
    newMoreInformation.textContent = 'Play ▶';
    parent.appendChild(newMoreInformation);
}
// More information button
function bestBoxeMoreInformation(parent) {
    let newPlay = document.createElement('button');
    newPlay.className = 'best_movie--info modal-trigger';
    newPlay.textContent = 'More info';
    parent.appendChild(newPlay);
}
// Fuction calling functions to display the best movie data
function bestMovieBox(request, parent) {fetch(request)
        .then(response => {if(response.ok) {response.json()
        .then(data => {
            // Title of the best movie
            bestBoxeTitle(data, parent);

            // Picture of the best movie
            bestBoxePicture(data, parent);

            // More information button of the best movie
            bestBoxePlayButton(parent);

            // Play button of the best movie
            bestBoxeMoreInformation(parent);
        })
    }})
}
const bestMovieRequest = `http://localhost:8000/api/v1/titles/2646`
const bestMovieId = document.getElementById('best_movie')
bestMovieBox(bestMovieRequest, bestMovieId)