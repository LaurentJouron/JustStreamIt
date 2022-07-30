const bestMoviePicture = document.querySelector('.best_movie--picture');
const bestMovieTitle = document.querySelector('.best_movie--title');
const bestMoviePlay = document.querySelector('.best_movie--play')

const containerListTitle = document.querySelector(".container_list--title");
const containerListPicture = document.querySelector(".container_list--picture");

const containerPrevArrows = document.querySelector(".container--prev_arrows");
const containerNextArrows = document.querySelector(".container--next_arrows");

fetch(`http://localhost:8000/api/v1/titles/?imdb_score=9.6&genre=Comedy`)
    .then(response => {if(response.ok) {response.json()
    .then(data => {
        let movieTitle = data.results[0].title;
        let moviePicture = data.results[0].image_url;

        bestMovieTitle.innerHTML = movieTitle;
        bestMoviePicture.src = moviePicture;
        })
    } else {
        bestMovieTitle.innerHTML = "Error";
    }
})


bestMoviePlay.addEventListener('click', ()=> {
    console.log('ouvre la fenetre modale')
})


fetch(`http://localhost:8000/api/v1/titles/?imdb_score=9.2`)
    .then(response => {if(response.ok) {response.json()
    .then(data => {
        let moviePicture = data.results[0].image_url;
        containerListPicture.src = moviePicture;
        })
    } else {
        containerListTitle.innerHTML = "Error";
    }
})

containerPrevArrows.addEventListener('click', () => {
    containerPrevArrows.getElementsByClassName("container--prev_arrows");
    move(--currentIndex);

// containerPrevArrows.stopPropagation();
})

containerNextArrows.addEventListener('click', () => {
    containerNextArrows.getElementsByClassName("container--next_arrows");
    move(++currentIndex);

    // containerNextArrows.stopPropagation();
})


// function getRandomCategorie () {
//     let genre = ['History', 'Drama', 'Documentary', 'Sport', 'Music', 'Animation', 'News',
//     'Adventure', 'Adult', 'Sci-Fi', 'Family', 'Romance', 'Horror', 'Comedy', 'Biography',
//     'Fantasy', 'Film-Noir', 'Crime', 'Action', 'Thriller', 'Western', 'Mystery', 'Reality-TV',
//     'War', 'Musical'];
//     categorie = Math.floor(Math.random() * (Math.ceil(0), Math.floor(genre.length)));
//  return genre[categorie];
// }
// categorie = getRandomCategorie()