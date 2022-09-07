const APIUrl = `http://localhost:8000/api/v1/titles/?`

////////////////
// BEST MOVIE //
////////////////
async function getBestMovie(idParent) {
    try {
        const response = await fetch(APIUrl+`sort_by=-imdb_score`)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => {
                movieURL = data.results[0].url
                {fetch(movieURL)
                    .then(response => {if(response.ok) {response.json()
                    .then(data => {
                        const getMoviePicture = document.querySelector(`.movie_picture__${idParent}`)
                        const getMovieTitle = document.querySelector(`.movie_title__${idParent}`)
                        const getMovieDescription = document.querySelector(`.movie_description__${idParent}`)

                        getMovieTitle.textContent = data.title;
                        getMoviePicture.src = data.image_url;
                        getMovieDescription.textContent = data.description                      
                    })
                }})}
            }) 
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(error) {
        errorMsg.textContent = `${error}`
    }
}
getBestMovie(`best_movie`)


/////////////////////
// CATEGORIE MOVIE //
/////////////////////
async function getMovieCategorie(idParent, getCategorie, categorieName) {
    const carousel = document.querySelector(`.carousel__${idParent}`)
    try {
        const response = await fetch(APIUrl+getCategorie)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => {

                const getCategortieTitle = document.querySelector(`.categorie_title__${idParent}`)
                getCategortieTitle.textContent = categorieName

                    for(let i = 0; i < 5; i++) {
                        movieURL = data.results[i].url
                        {fetch(movieURL)
                            .then(response => {if (response.ok) {response.json()
                            .then(data => {
                                let picture = document.createElement('img');
                                picture.id = data.id;     
                                picture.className = 'item';
                                picture.alt = data.title;
                                picture.src = data.image_url;
                                carousel.appendChild(picture);
                            })
                        }})}
                    }
                    let nextPage = data.next
                    {fetch(nextPage)
                        .then(response => {if(response.ok) {response.json()
                        .then(data => {
                            /// We read about the first 2 films of the package
                            for(i = 0; i < 2; i++) {
                                movieURL = data.results[i].url
                                {fetch(movieURL)
                                .then(response => {if (response.ok) response.json()
                                .then(data => {
                                    picture = document.createElement('img');
                                    picture.id = data.id;     
                                    picture.className = 'item';
                                    picture.alt = data.title;
                                    picture.src = data.image_url;
                                    carousel.appendChild(picture); 
                                    })
                                })
                            }}
                        })

                    }})
                }
            }
        )
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(error) {
        errorMsg.textContent = `${error}`
    }
}

getMovieCategorie(`top_rated`, `imdb_score_min=9&imdb_score_max=10`, `Top rated`)
getMovieCategorie(`first_categorie`, `genre=Comedy&sort_by=-imdb_score`, `Comedy`)
getMovieCategorie(`second_categorie`, `genre=Animation&sort_by=-imdb_score`, `Animation`)
getMovieCategorie(`third_categorie`, `genre=Sport&sort_by=-imdb_score`, `Sport`)


/////////////////
// MODAL MOVIE //
/////////////////
let modal = null
const focusableSelector = `button, a, input, textarea`
let focusables = []
let previouslyFocusedElement = null

const openModal = async function (event) {
    event.preventDefault()
    const target = event.target.getAttribute(`href`)
    if (target.startsWith(`#`)) {
        modal = document.querySelector(target)
    } else {
        modal = await loadModal(target)
    }
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(`:focus`)
    modal.style.display = null
    focusables[0].focus()
    modal.removeAttribute(`aria-hidden`)
    modal.setAttribute(`aria-modal`, `true`)
    modal.addEventListener(`click`, closeModal)
    modal.querySelector(`.js-close-modal`).addEventListener(`click`, closeModal)
    modal.querySelector(`.js-close-stop`).addEventListener(`click`, stopPropagation)
}

const closeModal = function (event) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    event.preventDefault()
    modal.setAttribute(`aria-hidden`, `true`)
    modal.removeAttribute(`aria-modal`)
    modal.removeEventListener(`click`, closeModal)
    modal.querySelector(`.js-close-modal`).removeEventListener(`click`, closeModal)
    modal.querySelector(`.js-close-stop`).removeEventListener(`click`, stopPropagation)
    const hideModal = function() {
        modal.style.display = `none`
        modal.removeEventListener(`animationend`, hideModal)
        modal = null
    }
    modal.addEventListener(`animationend`, hideModal)
}

const stopPropagation = function (event) {
    event.stopPropagation()
}

const focusInModal = function (event) {
    event.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(`:focus`))
    if (event.shiftkey === true) {
        index--
    } else {
        index++
    }
    if(index >= focusables.length) {
        index = 0
    }
    if(index < 0){
        index.focusables.length - 1
    }
    focusables[index].focus()
}

const loadModal = async function (url) {
    const target = `#` + url.split(`#`)[1]
    const existingModal = document.querySelector(target)
    if (existingModal !== null) return existingModal
    const html = await fetch(url).then(response => response.text())
    const element = document.createRange().createContextualFragment(html).querySelector(target)
    if (element === null) throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`
    document.body.append(element)
    return element
}

document.querySelectorAll(`js-modal`).forEach(a => {
    a.addEventListener(`click`, openModal)
})

window.addEventListener(`keydown`, function (event) {
    if (event.key === `Escape` || event.key === `Esc`) {
        closeModal(event)
    }
    if (event.key === `Tab` && modal !== null) {
        focusInModal(event)
    }
})
