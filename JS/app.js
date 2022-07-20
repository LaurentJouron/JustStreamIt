const bestMoviesContainerPictures = document.querySelector('.best_movies__container--pictures');
const bestMoviesContainerItemsTitle = document.querySelector('.best_movies__container__Items--title');

const containerListItem = document.querySelectorAll(".container_list--item");

const bestMoviesPlayButton = document.querySelector(".best_movies__container__Items--play-button");
const containerListDirectionLeft = document.querySelector(".container_list__direction--left");
const containerListDirectionRight = document.querySelector(".container_list__direction--right");

fetch(`http://localhost:8000/api/v1/titles/?imdb_score=9.6&genre=Comedy`)
    .then(response => {
        if(response.ok) {
            response.json().then(data => {
                let moviePicture = data.results[0].image_url;
                let movieTitle = data.results[0].title;
                bestMoviesContainerPictures.src = moviePicture;
                bestMoviesContainerItemsTitle.innerHTML = movieTitle;
            })
            } else {
                document.getElementsByClassName("best_movies__container__Items--title").innerHTML = "Error";
            }
        })


    bestMoviesPlayButton.addEventListener('click', () => {
        bestMoviesPlayButton.getElementsByClassName("best_movies__container__Items--play-button");
    })

    containerListDirectionLeft.addEventListener('click', () => {
        containerListDirectionLeft.getElementsByClassName("container_list__direction--left");

        // containerListDirectionLeft.stopPropagation();
    })

    containerListDirectionRight.addEventListener('click', () => {
        containerListDirectionRight.getElementsByClassName("container_list__direction--right");
    
        // containerListDirectionRight.stopPropagation();
    })



// function getRandomCategorie () {
//     let genre = ['History', 'Drama', 'Documentary', 'Sport', 'Music', 'Animation', 'News',
//     'Adventure', 'Adult', 'Sci-Fi', 'Family', 'Romance', 'Horror', 'Comedy', 'Biography',
//     'Fantasy', 'Film-Noir', 'Crime', 'Action', 'Thriller', 'Western', 'Mystery', 'Reality-TV',
//     'War', 'Musical'];
//     categorie = Math.floor(Math.random() * (Math.ceil(0), Math.floor(genre.length)));
//  return genre[categorie];
// }

// function getMovieScore() {
//     for(i = Math.floor(20); i > 0; i = i - 0.1){
//         console.log(Number.parseFloat(i).toFixed(1))
//         }
//     }

// categorie = getRandomCategorie()
// score = getMovieScore()