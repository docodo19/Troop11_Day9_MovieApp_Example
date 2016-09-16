namespace bluemarker.Controllers {

    export class MovieCreateController {
        public movie:any = {
            imageUrl: 'http://www.palauoek.com/wp-content/uploads/2014/07/profile-default-male.png'
        }; // field that will contain the movie information that will be created
        public file;

        constructor(
            private movieService: bluemarker.Services.IMovieService,
            private $state: ng.ui.IStateService,
            private filepickerService,
            private $scope: ng.IScope){

        }

        public pickFile(){
            this.filepickerService.pick({
                mimetype: 'image/*',
            }, this.fileUploaded.bind(this));
        }

        private fileUploaded(file){

            this.file = file;
            this.movie.imageUrl = file.url;
            this.$scope.$apply(); // forces the page to update
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
