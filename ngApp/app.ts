namespace bluemarker {

    angular.module('bluemarker', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngAnimate']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: bluemarker.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: bluemarker.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('movie', {
                url: '/movie',
                templateUrl: '/ngApp/views/movie.html',
                controller: bluemarker.Controllers.MovieController,
                controllerAs: 'vm'
            })
            .state('movieCreate', {
                url: '/movie/create',
                templateUrl: '/ngApp/views/movieCreate.html',
                controller: bluemarker.Controllers.MovieCreateController,
                controllerAs: 'vm'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });
}
