const boxMovies = document.getElementById('box_movies');
const categoryTitle = document.getElementsByClassName("category_title");
const containerListItem = document.getElementsByClassName("container_list--item");
const boxMoviesPlayButton = document.querySelector(".box_movies--play-button");
const containerListDirectionLeft = document.querySelector(".container_list__direction--left");
const containerListDirectionRight = document.querySelector(".container_list__direction--right");

// http://localhost:8000/api/v1/titles/?imdb_score=9.3&genre=Comedy
// http://localhost:8000/api/v1/titles/?imdb_score=9.4&genre=Drama

fetch(`http://localhost:8000/api/v1/titles/?imdb_score=9.4&genre=Comedy`)
    .then(response => {
        if(response.ok) {
            response.json().then(data => {
                boxMovies.src = data.results[0].image_url;
            console.log(boxMovies.src)})
            } else {
                document.getElementsByClassName("box_movies--title").innerHTML = "Error";
            }
        })
    

    boxMoviesPlayButton.addEventListener('click', () => {
        boxMoviesPlayButton.getElementsByClassName("box_movies--play-button");
    })

    containerListDirectionLeft.addEventListener('click', () => {
        containerListDirectionLeft.getElementsByClassName("container_list__direction--left");

        // containerListDirectionLeft.stopPropagation();
    })

    containerListDirectionRight.addEventListener('click', () => {
        containerListDirectionRight.getElementsByClassName("container_list__direction--right");
    
        // containerListDirectionRight.stopPropagation();
    })

