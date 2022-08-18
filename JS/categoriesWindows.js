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
function movieCategorie(request, parent) {fetch(request)
    .then(response => {if(response.ok) {response.json()
        .then(data => {
            // Function call to display the title above the category
            categorieTitle(data, parent);
    
            // Div creation for container
            let newContainerDiv = document.createElement('div');
            newContainerDiv.className = 'container';
            parent.appendChild(newContainerDiv);
    
            // Add previews arrows
            sideArrows(newContainerDiv, '◀');
            
            for(let i = 0; i < 5; i++) {
                let newPicture = document.createElement('img');
                newPicture.className = 'container_list modal-trigger';      
                newPicture.src = data.results[i].image_url;
                newContainerDiv.appendChild(newPicture);
            }
            sideArrows(newContainerDiv, '▶');
        })
    }})  
}

function secondURLOfCategorie(request) {fetch(request)
    .then(response => {if(response.ok) {response.json()
        .then(data => {
            let secondAdresse = data.next;
            return secondAdresse
        })
    }})
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



//////////////////////////////////////
// TEST CATEGORY FUNCTION GRAFIKART //
//////////////////////////////////////

// Function for the movie categorie
// async function movieCategorie(request, parent) {
//     try {
//         let response =  await fetch(request)
//             if (response.ok) {response.json()
//                 if (response.ok) {
//                     let data = await response.json()

//                     // Function call to display the title above the category
//                     categorieTitle(data, parent);

//                     // Div creation for container
//                     let newContainerDiv = document.createElement('div');
//                     newContainerDiv.className = 'container';
//                     parent.appendChild(newContainerDiv);

//                     // Add previews arrows
//                     previewsArrows(newContainerDiv);

//                     for(let i = 0; i < 5; i++) {
//                         let newPicture = document.createElement('img');
//                         newPicture.className = 'container_list modal-trigger';      
//                         newPicture.src = data.results[i].image_url;
//                         newContainerDiv.appendChild(newPicture);
//                     }
//                     nextArrows(newContainerDiv);
//         } else {
//             console.error('Retour du serveur : ', response.status)
//         }
//     }
//     } catch (e) {
//         console.error(e)
//     }
// }


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