//////////////
// REQUESTS //
//////////////
function bestMovieRequest() {
    return 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'
}

//////////////
// FUNCTION //
//////////////

// Fuction to fill the category of best film
// Title
function title(data, parent) {
    let title = document.createElement('h1');
    title.className = 'best_movie--title';
    title.textContent = data.results[0].title;
    parent.appendChild(title);
}
// Picture
function picture(data, parent) {
    let picture = document.createElement('img');
    picture.className = 'best_movie--picture';
    picture.src = data.results[0].image_url;
    parent.appendChild(picture);
}
// Play button
function playButton(parent) {
    let playButton = document.createElement('button');
    playButton.className = 'best_movie--play';
    playButton.textContent = 'Play ▶';
    parent.appendChild(playButton);
}
// More information button
function moreInformationButton(parent) {
    let moreInformationButton = document.createElement('button');
    moreInformationButton.className = 'best_movie--info modal-trigger';
    moreInformationButton.textContent = 'More info';
    parent.appendChild(moreInformationButton);
}

///////////
// FETCH //
///////////

// // Fuction calling functions to display the best movie data
async function bestMovie(request, parent) {
    try {
        const response = await fetch(request)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => {

            // Title of the best movie
            title(data, parent);

            // Picture of the best movie
            picture(data, parent);

            // More information button of the best movie
            playButton(parent);

            // Play button of the best movie
            moreInformationButton(parent);
            })
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (error) {
        errorMsg.textContent = `${error}`
    }
}

//////////////////
// CALL METHODE //
//////////////////

const bestMovieId = document.getElementById('best_movie')
bestMovie(bestMovieRequest(), bestMovieId)