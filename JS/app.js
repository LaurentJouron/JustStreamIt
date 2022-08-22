//////////////
// REQUESTS //
//////////////
function requestConstruction (search) {
    return `http://localhost:8000/api/v1/titles/${search}`
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
// Play button and More information button
function element(parent, newElement, className, textContent) {
    let element = document.createElement(newElement);
    element.className = className;
    element.textContent = textContent;
    parent.appendChild(element);
}

////////////////////
// FETCH FUNCTION //
////////////////////
/**
 * Fuction calling functions to display the best movie data
 * @param {request}
 * @param {getElementById}
 * @returns {data}
 */
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
            element(parent,  'button', 'best_movie--play', 'Play ▶')

            // Play button of the best movie
            element(parent, 'button', 'best_movie--info modal-trigger', 'More info')
            })
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (error) {
        errorMsg.textContent = `${error}`
    }
}

/////////////////////////////
// CALL BEST MOVIE METHODE //
/////////////////////////////

const bestMovieId = document.getElementById('best_movie')
bestMovie(requestConstruction('?sort_by=-imdb_score'), bestMovieId)

////////////////////////
// CATEGORIE FUNCTION //
////////////////////////
/**
 * Fuction to call the title of each category
 * @param {data.response.json()}
 * @param {getElementById}
 * @returns {textContent}
 */
 function categorieTitle(data, parent){
    if (parent === document.getElementById('top_rated')) {
        let newCategorieTitle = document.createElement('h1');
        newCategorieTitle.className = 'categorie--title';
        newCategorieTitle.textContent = 'Top rated';
        parent.appendChild(newCategorieTitle);
    } else {
        let newCategorieTitle = document.createElement('h1');
        newCategorieTitle.className = 'categorie--title';
        newCategorieTitle.textContent = data.results[0].genres[0];
        parent.appendChild(newCategorieTitle);
    }
}

/**
 * Function that allows to put the arrows in one direction or the other on each side of the images.
 * @param {getElementById}
 * @param {textContent}
 * @returns {textContent}
 */
function sideArrows(parent, sense) {
    if (sense === '◀') {
        let newPreviewArrows = document.createElement('button');
        newPreviewArrows.id = 'slide-arrow-preview';
        newPreviewArrows.className = 'container--prev_arrows';
        newPreviewArrows.textContent = sense;
        parent.appendChild(newPreviewArrows);}
    if (sense === '▶') {
        let newNextArrows = document.createElement('button');
        newNextArrows.id = 'slide-arrow-next';
        newNextArrows.className = 'container--next_arrows';
        newNextArrows.textContent = sense;
        parent.appendChild(newNextArrows);
}}

//////////////////////////////
// FETCH CATEGORIE FUNCTION //
//////////////////////////////
/**
 * Function that calls the other functions for creating images on the document
 * @param {request}
 * @param {getElementById}
 * @returns {data}
 */
 async function movieCategorie(request, parent) {
    try {
		const response = await fetch(request)
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`)
			}
            if (response.ok) {response.json()
                .then(data => {
                    // Function call to display the title above the category
                    categorieTitle(data, parent);
                
                    // Div creation for container
                    let newContainerDiv = document.createElement('div');
                    newContainerDiv.className = 'container';
                    parent.appendChild(newContainerDiv);
            
                    // Add previews arrows
                    sideArrows(newContainerDiv, '◀');
                    
                    // First loop that recovers the first 5 elements
                    for(let i = 0; i < 5; i++) {
                    let newPicture = document.createElement('img');
                    newPicture.id = data.results[i].id;     
                    newPicture.className = 'container_list modal-trigger';
                    newPicture.alt = data.results[i].title;
                    newPicture.src = data.results[i].image_url;
                    newContainerDiv.appendChild(newPicture);
                }
                    // Recovery of the next URL to make a loop for 2 elements recovery
                    let nextPage = data.next
                    {fetch(nextPage)
                        .then(response => {if(response.ok) {response.json()
                            .then(data => {
                                for(let i = 0; i < 2; i++) {
                                let newPicture = document.createElement('img');
                                newPicture.id = data.results[i].id;
                                newPicture.className = 'container_list modal-trigger';      
                                newPicture.src = data.results[i].image_url;
                                newPicture.alt = data.results[i].title;
                                newContainerDiv.appendChild(newPicture);
                                }
                            sideArrows(newContainerDiv, '▶');
                        })
                    }})
                }
            })
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(error) {
        errorMsg.textContent = `${error}`
    }
}

////////////////////////////
// CALL CATEGORIE METHODE //
////////////////////////////

const topRated = document.getElementById('top_rated')
movieCategorie(requestConstruction('?imdb_score_min=9&imdb_score_max=10'), topRated)

const firstCategorie = document.getElementById('first_categorie')
movieCategorie(requestConstruction(`?genre=Comedy`), firstCategorie)

const secondCategorie = document.getElementById('second_categorie')
movieCategorie(requestConstruction(`?genre=Animation`), secondCategorie)

const thirdCategorie = document.getElementById('third_categorie')
movieCategorie(requestConstruction(`?genre=War`), thirdCategorie)


/////////////////////
// RANDOM CATEGORY //
/////////////////////

// function getRandomCategorie () {
//     let categorieList = [];
//     for(let i = 0; i < 3; i++) {
//     let genre = ['History', 'Drama', 'Documentary', 'Sport', 'Music', 'Animation', 'News',
//     'Adventure', 'Adult', 'Sci-Fi', 'Family', 'Romance', 'Horror', 'Comedy', 'Biography',
//     'Fantasy', 'Film-Noir', 'Crime', 'Action', 'Thriller', 'Western', 'Mystery', 'Reality-TV',
//     'War', 'Musical'];
//     categorie = Math.floor(Math.random() * (Math.ceil(0), Math.floor(genre.length)));
//     categorieList.push(genre[categorie])}
//     return categorieList
// }
// console.log(getRandomCategorie())