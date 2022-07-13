const btnMoviePlay = document.querySelector(".box_movies--play-button");
const btnLeftDirection = document.querySelector(".container_list__direction--left");
const btnRightDirection = document.querySelector(".container_list__direction--right");
const allItemsList = document.querySelectorAll('.container_list--item');

fetch('http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=')
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data)
    })
    
    btnMoviePlay.addEventListener('click', () => {
        btnMoviePlay.getElementsByClassName("box_movies--play-button");
    })

    btnLeftDirection.addEventListener('click', () => {
         btnLeftDirection.getElementsByClassName("container_list__direction--left");

        // btnLeftDirection.stopPropagation();
    })

    btnRightDirection.addEventListener('click', () => {
        btnRightDirection.getElementsByClassName("container_list__direction--right");
    
        // btnLeftDirection.stopPropagation();
    })

