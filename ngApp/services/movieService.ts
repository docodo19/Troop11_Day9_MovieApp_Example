namespace bluemarker.Services {

    export interface IMovieService {
        saveMovie(movie);
        getMovies();
        getMovie(id);
        deleteMovie(id);
    }


    // Movie Service that will connect to /api/movies/:id
    export class MovieService implements IMovieService{
        // fields
        private movieResource;

        constructor($resource:ng.resource.IResourceService){
            // assign $resource object that connects to /api/movies/:id to movieResource
            this.movieResource = $resource('/api/movies/:id');
        }

        // CRUD: Create
        saveMovie(movie){
            return this.movieResource.save(movie).$promise;
        }

        // CRUD: Read
        getMovies(){ // get all movies
            return this.movieResource.query();
        }

        getMovie(id){ // get movie by movie's id
            return this.movieResource.get({id: id});
        }
        // CRUD: Update
        // -- use Create method

        // CRUD: Delete
        deleteMovie(id){ // delete movie by movie's id
            return this.movieResource.delete({id: id}).$promise;
        }
    }
    angular.module('bluemarker').service('movieService', MovieService);
}
