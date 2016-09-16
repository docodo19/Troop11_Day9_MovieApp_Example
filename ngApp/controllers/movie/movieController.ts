namespace bluemarker.Controllers {

    export class MovieController {
        // field that will contain all the movies
        public movies;
        public showMovie;

        constructor(
            private movieService: bluemarker.Services.IMovieService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $window:ng.IWindowService){

            this.showMovie = false;
            this.getMovies();
        }

        getMovies(){ // gets all movies
            // returns all the movies from the movieService >> getMovies();
            //this.movies = this.movieService.getMovies();

            this.$window.setTimeout(()=>{
                this.movies = this.movieService.getMovies();
                this.showMovie = true;
            }, 3000);

        }

        getMovieDetails(id){
            this.$uibModal.open({
                templateUrl: '/ngApp/views/movieDetails.html',
                controller: bluemarker.Controllers.MovieDetailsController,
                controllerAs: 'vm',
                resolve: {
                    movieId: ()=> id,
                },
                size: 'sm'
            }).result.then((data)=>{
                console.log(data.hasBeenEdited);
                if(data.hasBeenEdited == true){
                    this.getMovies();
                }
            });
        }
    }

}
