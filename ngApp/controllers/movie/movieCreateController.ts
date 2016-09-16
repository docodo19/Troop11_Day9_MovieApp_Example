namespace bluemarker.Controllers {

    export class MovieCreateController {
        public movie; // field that will contain the movie information that will be created

        constructor(
            private movieService: bluemarker.Services.IMovieService,
            private $state: ng.ui.IStateService){

        }

        saveMovie(){
            this.movieService.saveMovie(this.movie)
                .then(()=>{
                    this.$state.go('movie');
                })
                .catch(()=>{
                    console.log('something went wrong...');
                });
        }

    }

}
