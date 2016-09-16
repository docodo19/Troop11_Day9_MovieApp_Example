import express = require('express');
let router = express.Router();

// create static list of movies
let movies = [
   {id:1, title:"Star Wars", director:"Lucas", imageUrl: "http://media.beliefnet.com/~/media/photos-with-attribution/entertainment/galleries/star-wars/starwars.jpg?as=1&w=400" },
   {id:2, title:"The Martian", director:"Scott", imageUrl: "http://i0.wp.com/www.litlaughlearn.com/wp-content/uploads/2015/09/Book-to-Movie.jpg?resize=400%2C300" },
   {id:3, title:"Ex Machina", director:"Garland", imageUrl: "http://img.goldposter.com/2015/03/Ex-Machina-poster-goldposter-com-001.jpg@0o_0l_400w_70q.jpg" },
   {id:4, title:"Superman", director:"Donner", imageUrl: "http://images.clipartpanda.com/superman-clip-art-superman-logo.png" },
   {id:5, title:"Shrek", director:"Adamson", imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRCz3VAj90ZItKPUQCLzzAm3sjj74WvDiE8LkzJQVoG4FBbPPgi" }
];
// unique movie id
let movieId = movies.length;

/* GET movies */
router.get('/movies', function(req, res, next) {
  res.json(movies);
});

/* GET movie by id */
router.get('/movies/:id', function(req, res, next) {
  let id = parseInt(req.params['id']);
  let movie = findMovie(id);
  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
});

/* Post to create or update movie */
router.post('/movies', function(req, res, next) {
  let movie = req.body;
  // update existing movie
  if (movie.id) {
    let original = findMovie(movie.id);
    original.title = movie.title;
    original.director = movie.director;
    original.imageUrl = movie.imageUrl;
  // create new movie
  } else {
    movie.id = ++movieId;
    movies.push(movie);
  }
  res.sendStatus(200);
});

/* delete movie by id */
router.delete('/movies/:id', function(req, res, next) {
  let id = parseInt(req.params['id']);
  if (!findMovie(id)) {
    res.sendStatus(404);
  } else {
    movies = movies.filter((movie)=> {
      return movie.id != id;
    });
    res.sendStatus(200);
  }
});

/* find matching movies */
router.get('/movies/search/:search', function(req, res, next) {
    let search = req.params['search'];
    let matches = movies.filter((movie)=>{
      return movie.title.indexOf(search) == 0;
    });
    res.json(matches);
});

function findMovie(id:number) {
  let matches = movies.filter((movie) => {
    return movie.id == id;
  });
  return matches.length ? matches[0] : null;
}

export = router;
