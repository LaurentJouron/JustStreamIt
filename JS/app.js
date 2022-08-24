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

///////////////////////////////
// FETCH BEST MOVIE FUNCTION //
///////////////////////////////
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
     let categorieTitle = document.createElement('h1');
     categorieTitle.className = 'categorie--title';
    if (parent === document.getElementById('top_rated')) {
        categorieTitle.textContent = 'Top rated';
        parent.appendChild(categorieTitle);
    } else {
        categorieTitle.textContent = data.results[0].genres[0];
        parent.appendChild(categorieTitle);
    }
}
/**
 * Function that allows to put the arrows in one direction or the other on each side of the images.
 * @param {getElementById}
 * @param {textContent}
 * @returns {textContent}
 */
function sideArrows(parent, direction) {
    if (direction === '◀') {
        let carouselPreview = document.createElement('button');
        carouselPreview.className = 'carousel__preview';
        carouselPreview.textContent = direction;
        parent.appendChild(carouselPreview);}
    if (direction === '▶') {
        let carouselNext = document.createElement('button');
        carouselNext.className = 'carousel__next';
        carouselNext.textContent = direction;
        parent.appendChild(carouselNext);
    }
}

/**
 * Loop function to retrieve items from categories
 * @param {data from FETCH request}
 * @param {let Variable} 
 * @param {integer} NbrLoop 
 */
function loopForCategorieInformation(data, parent, NbrLoop){
    for(let i = 0; i < NbrLoop; i++) {
        let picture = document.createElement('img');
        picture.id = data.results[i].id;     
        picture.className = 'carousel__panorama--item modal-trigger';
        picture.alt = data.results[i].title;
        picture.src = data.results[i].image_url;
        parent.appendChild(picture);
    }
}

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
                
                // Add previews arrows
                sideArrows(parent, '◀');
                    
                    // Div creation for container
                    let containerDiv = document.createElement('div');
                    containerDiv.className = 'container';
                    parent.appendChild(containerDiv);
                    
                    let carousel = document.createElement('div');
                    carousel.className = 'carousel';
                    containerDiv.appendChild(carousel);
                    
                    let carouselPanorama = document.createElement('div');
                    carouselPanorama.className = 'carousel--panorama';
                    carousel.appendChild(carouselPanorama);
                    
                    // First loop that recovers the first 5 elements
                    loopForCategorieInformation(data, carouselPanorama, 5)
                    // Recovery of the next URL to make a loop for 2 elements recovery
                    let nextPage = data.next
                    {fetch(nextPage)
                        .then(response => {if(response.ok) {response.json()
                            .then(data => {
                                loopForCategorieInformation(data, carouselPanorama, 2)
                            })
                        }})
                    }
                    sideArrows(parent, '▶');
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


//////////////
// CAROUSEL //
//////////////

class Carousel {
    /**
     * @param {HTMLElement}
     * @param {object}
     * @param {object} options.slidesToScroll number of items to scroll through
     * @param {object} options.slidesToVisible number of elements visible in the slide
     * @param {boolean} options.loop should we finish the carousel
     */
    constructor (element, options = {}) {
        this.element = element
        this.options = object.assign({}, {
            slidesToScroll: 1,
            slidesToVisible: 4,
            loop: false
        }, options)
        
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__panorama')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallBacks = []
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__panorama--item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
        this.moveCallBacks.forEach(callBack => callBack(0))
    }
    /**
     * Applies the correct dimensions to the carousel elements.
     */
    setStyle () {
        let ratio = this.items.length / this.options.slidesToVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesToVisible) / ratio) + "%")
            
    }
    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        this.onMove(index => {
            if(index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if (this.item[this.currentItem + this.options.slidesToVisible] === undefined){
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.add('carousel__next--hidden')
            }
        })
    }
    next () {
        this.gotToItem(this.currentItem + this.options.slidesToScroll)

    }
    prev () {
        this.gotToItem(this.currentItem - this.options.slidesToScroll)
    }
    /**
     * Moves the carousel to the target element
     * @param {number} index 
     */
    gotToItem(index) {
        if (index < 0) {
            index = this.items.length - this.options.visible
        } else if (index >= this.items.length || this.item[this.currentItem + this.options.slidesToVisible] === undefined) {
            index = 0
        }
        let translateX = index * 100 / this.items.length
        this.container.style.transfom = 'translate3d(' + translateX + ' %, 0, 0)'
        this.currentItem = index
        this.moveCallBacks.forEach(callBack => callBack(index))
    }

    onMove(callBack) {
        this.moveCallBacks.push(callBack)
    }

    /**
     * @param {string} 
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}
    
    
document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.querySelector('#top_rated'), {
        slidesToScroll: 1,
        slidesToVisible: 4,
        loop: false
    })

    new Carousel(document.querySelector('#first_categorie'), {
        slidesToScroll: 3,
        slidesToVisible: 4,
        loop: false
    })
    new Carousel(document.querySelector('#second_categorie'), {
        slidesToScroll: 3,
        slidesToVisible: 4,
        loop: false
    })
    new Carousel(document.querySelector('#third_categorie'), {
        slidesToScroll: 3,
        slidesToVisible: 4,
        loop: false
    })
})


///////////////////
// MODAL WINDOWS //
///////////////////

// Modal windows
const modalPicture = document.getElementById('modal_picture');
const modalTitle = document.getElementById('modal_title');
const modalGenres = document.getElementById('modal_genres');
const modalDatePublished = document.getElementById('modal_date_published');
const modalRated = document.getElementById('rated');
const modalScore = document.getElementById('modal_score');
const modalDirectors = document.getElementById('modal_directors');
const modalActors = document.getElementById('modal_actors');
const modalDuration = document.getElementById('modal_duration');
const modalOrigineCountries = document.getElementById('modal_origine_countries');
const modalResultsOfBoxOffice = document.getElementById('modal_results_of_box_office');
const modalDescription = document.getElementById('modal_description');

function modalWindows(modalRequest) {fetch(modalRequest)
        .then(response => {if(response.ok) {response.json()
        .then(data => {
            modalPicture.src = data.image_url;
            modalTitle.textContent = "Title: " + data.title;
            modalGenres.textContent = "Genres: " + data.genres;
            modalDatePublished.textContent = "Date published: " + data.date_published;
            modalRated.textContent = "Rated: " + data.rated;
            modalScore.textContent = "Score: " + data.imdb_score;
            modalDirectors.textContent = "Directors: " + data.directors;
            modalActors.textContent = "Actors: " + data.actors;
            modalDuration.textContent = "Duration: " + data.duration + " min";
            modalOrigineCountries.textContent = "Countrie: " + data.countries;
            // modalResultsOfBoxOffice.textContent = "Box Office: " + data.;
            modalDescription.textContent = "Description: " + data.description;
        })
        }
    })
}

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
)

function toggleModal() {
     modalContainer.classList.toggle("active")
}







(function() {
    const carousel = document.getElementsByClassName('carousel')[0],
        slider = carousel.getElementsByClassName('carousel__slider')[0],
        items = carousel.getElementsByClassName('carousel__slider__item'),
        prevBtn = carousel.getElementsByClassName('carousel__prev')[0],
        nextBtn = carousel.getElementsByClassName('carousel__next')[0];
    
    let width, height, totalWidth, margin = 20,
        currIndex = 0
    
    function init() {
        resize();
        move(Math.floor(items.length / 2));
        bindEvents();
    }
    
    function resize() {
        width = Math.max(window.innerWidth * .25, 275),
        height = window.innerHeight * .5,
        totalWidth = width * items.length;
      
        slider.style.width = totalWidth + "px";
      
        for(let i = 0; i < items.length; i++) {
            let item = items[i];
            item.style.width = (width - (margin * 2)) + "px";
            item.style.height = height + "px";
        }
    }
    
    function move(index) {
        if(index < 1) index = items.length;
        if(index > items.length) index = 1;
        currIndex = index;
      
        for(let i = 0; i < items.length; i++) {
            let item = items[i],
                box = item.getElementsByClassName('item__3d-frame')[0];
            if(i == (index - 1)) {
                item.classList.add('carousel__slider__item--active');
                box.style.transform = "perspective(1200px)"; 
            } else {
              item.classList.remove('carousel__slider__item--active');
                box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
            }
        }
      
        slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
    }
    
    function timer() {
        clearInterval(interval);    
        interval = setInterval(() => {
          move(++currIndex);
        }, intervalTime);    
    }
    
    function prev() {
      move(--currIndex);
    }
    
    function next() {
      move(++currIndex);    
    }
  
    function bindEvents() {
        window.onresize = resize;
        prevBtn.addEventListener('click', () => {prev(); });
        nextBtn.addEventListener('click', () => {next(); });    
    }
    init();
  })();