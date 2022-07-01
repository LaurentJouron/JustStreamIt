const btnMoviePlayer = document.querySelector(".box-movies__player");
const btnLeftDirection = document.getElementsByClassName(".item_direction_left");
const btnRightDirection = document.getElementsByClassName(".item_direction_right");
const allItemsList = document.querySelectorAll('.item');

function tabPlus(tab, func){
  const newTab = [];
  for (let i = 0; i < tab.length; i++){
    newTab.push(func(tab[i]));
  }
  return newTab;
}

function tabMoins(tab, func){
  const newTab = [];
  for (let i = 0; i < tab.length; i--){
    newTab.ficht(func(tab[i]));
  }
  return newTab;
}

const plusUn = nb => nb + 1;
const moinsUn = nb => nb - 1;

const tableauPlusUn = tabPlus([1,2,3], plusUn);
  console.log(tableauPlusUn);

const previous = () => (--currentIndex);
const next = () => (++currentIndex);

btnMoviePlayer.addEventListener('click', play())

btnLeftDirection.addEventListener('click', previous())

btnRightDirection.addEventListener(`click`, next())


class movie {
    constructor(title, original_title, year, date_published , duration, description, long_description, avg_vote){
      this.title = title;
      this.original_title = original_title;
      this.year = year;
      this.date_published = date_published;
      this.duration = duration;
      this.description = description;
      this.long_description = long_description;
      this.avg_vote = avg_vote;
    }
  }

class movieActor {
  constructor(movie, actor, position){
    this.movie = movie;
    this.actor = actor;
    this.position = position;
  }
}

class gender {
  constructor(name, objects){
    this.name = name;
    this.objects = objects;
  }
}
