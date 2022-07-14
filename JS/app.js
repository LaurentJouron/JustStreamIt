const categoryTitle = document.getElementsByClassName("category_title");
const containerListItem = document.getElementsByClassName("container_list--item");
const boxMoviesPlayButton = document.querySelector(".box_movies--play-button");
const containerListDirectionLeft = document.querySelector(".container_list__direction--left");
const containerListDirectionRight = document.querySelector(".container_list__direction--right");

fetch(`http://localhost:8000/api/v1/titles/`)
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data.result)
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

