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
