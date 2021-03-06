
var app = angular.module('meomeonotes', ['ionic', 'meomeonotes.notestore']);

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.navBar.alignTitle('center');

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  });

  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'templates/edit.html',
    controller: "AddCtrl"
  });

  $stateProvider.state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/list');

});



app.controller('ListCtrl', function($scope, NoteStore) {

  $scope.reordering = false;
  $scope.notes = NoteStore.list();

  $scope.remove = function(noteID){
    NoteStore.remove(noteID);
  };

  $scope.move = function(note, fromIndex, toIndex) {
    console.log('moving from ' + fromIndex + ' to ' + toIndex);
    NoteStore.move(note, fromIndex, toIndex);
  };

  $scope.toogleReordering = function() {
    $scope.reordering = !$scope.reordering;
  }
});

app.controller('AddCtrl', function($scope, $state, NoteStore) {

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function(){
    //createNote($scope.note);
    NoteStore.create($scope.note);
    $state.go('list');
  }

});

app.controller('EditCtrl', function($scope, $state, NoteStore) {

  $scope.note = angular.copy(NoteStore.get($state.params.noteId));

  $scope.save = function(){
    NoteStore.update($scope.note);
    $state.go('list');
  }

});


//.run(function($ionicPlatform) {
//  $ionicPlatform.ready(function() {
//    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//    // for form inputs)
//    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
//      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//      cordova.plugins.Keyboard.disableScroll(true);
//
//    }
//    if (window.StatusBar) {
//      // org.apache.cordova.statusbar required
//      StatusBar.styleDefault();
//    }
//  });
//})
