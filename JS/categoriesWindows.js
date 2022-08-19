//////////////
// REQUESTS //
//////////////
// http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=
// http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=
// GET /api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=9&imdb_score_max=10&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=

////////////////
// CATEGORIES //
////////////////
/**
 * Fuction to call the title of each category
 * @param {data.response.json()}
 * @param {getElementById}
 * @returns {textContent}
 */
function categorieTitle(data, parent){
    let newCategorieTitle = document.createElement('h1');
    newCategorieTitle.className = 'categorie--title';
    newCategorieTitle.textContent = data.results[0].genres[0];
    parent.appendChild(newCategorieTitle);
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
        newPreviewArrows.className = 'container--prev_arrows';
        newPreviewArrows.textContent = sense;
        parent.appendChild(newPreviewArrows);}
    if (sense === '▶') {
        let newNextArrows = document.createElement('button');
        newNextArrows.className = 'container--next_arrows';
        newNextArrows.textContent = sense;
        parent.appendChild(newNextArrows);
}}

/**
 * Function that calls the other functions for creating images on the document
 * @param {request}
 * @param {getElementById}
 * @returns {data}
 */
 async function movieCategorie(request, parent) {
    try {
		const response = await fetch(request)
			if(!response.ok) {
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
                    newPicture.className = 'container_list modal-trigger';      
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
                                newPicture.className = 'container_list modal-trigger';      
                                newPicture.src = data.results[i].image_url;
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

const topRatedRequest = 'http://localhost:8000/api/v1/titles/?imdb_score=9.2'
const topRated = document.getElementById('top_rated')
movieCategorie(topRatedRequest, topRated)

const firstRequest = 'http://localhost:8000/api/v1/titles/?genre=Sport'
const firstCategorie = document.getElementById('first_categorie')
movieCategorie(firstRequest, firstCategorie)

const secondRequest = 'http://localhost:8000/api/v1/titles/?genre=Action'
const secondCategorie = document.getElementById('second_categorie')
movieCategorie(secondRequest, secondCategorie)

const thirdRequest = 'http://localhost:8000/api/v1/titles/?genre=Adventure'
const thirdCategorie = document.getElementById('third_categorie')
movieCategorie(thirdRequest, thirdCategorie)

/////////////////////
// RANDOM CATEGORY //
/////////////////////

// function getRandomCategorie () {
//     let genre = ['History', 'Drama', 'Documentary', 'Sport', 'Music', 'Animation', 'News',
//     'Adventure', 'Adult', 'Sci-Fi', 'Family', 'Romance', 'Horror', 'Comedy', 'Biography',
//     'Fantasy', 'Film-Noir', 'Crime', 'Action', 'Thriller', 'Western', 'Mystery', 'Reality-TV',
//     'War', 'Musical'];
//     categorie = Math.floor(Math.random() * (Math.ceil(0), Math.floor(genre.length)));
//  return genre[categorie];
// }
// categorie = getRandomCategorie()