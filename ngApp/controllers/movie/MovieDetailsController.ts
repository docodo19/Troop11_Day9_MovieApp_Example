namespace bluemarker.Controllers {

    export class MovieDetailsController {
        public movie;
        public isEditMode;
        private hasBeenEdited;

        constructor(
            public movieId,
            private movieService: bluemarker.Services.IMovieService,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance){

            this.isEditMode = false;
            this.hasBeenEdited = false;
            this.getMovie();
        }

        closeModal(){
            this.$uibModalInstance.close({hasBeenEdited: this.hasBeenEdited});
        }

        toggleEditMode(){
            this.isEditMode = !this.isEditMode;
        }

        getMovie(){
            this.movie = this.movieService.getMovie(this.movieId);
        }

        saveMovie(){
            this.movieService.saveMovie(this.movie)
                .then(()=>{
                    this.hasBeenEdited = true;
                    this.toggleEditMode();
                })
                .catch(()=>{
                    console.log("something went wrong...")
                });
        }

        deleteMovie(){
            this.movieService.deleteMovie(this.movieId)
                .then(()=>{
                    this.hasBeenEdited = true;
                    this.closeModal();
                })
                .catch(()=>{
                    console.log("something went wrong");
                });
        }

        cancelSave() {
            this.getMovie();
            this.toggleEditMode();
        }

    }

}
