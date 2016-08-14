
var app = angular.module('meomeonotes', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider) {

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

app.factory('NoteStore', function(){

  var notes = [];

  return {

    list: function() {
      return notes;
    },

    get: function(noteID){
      for ( var i = 0; i < notes.length; i++){
        if (notes[i].id === noteID){
          console.log(notes[i].title);
          return notes[i];
        }
      }
      return undefined;
    },

    create: function(note){
      notes.push(note);
    },

    update: function(note){
      for ( var i = 0; i < notes.length; i++){
        if (notes[i].id === note.id){
          notes[i] = note;
          return;
        }
      }
    }

  };

});

app.controller('ListCtrl', function($scope, NoteStore) {

  //$scope.notes = notes;
  $scope.notes = NoteStore.list();

});

app.controller('AddCtrl', function($scope, $state, NoteStore) {

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '1',
    description: '2'
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
