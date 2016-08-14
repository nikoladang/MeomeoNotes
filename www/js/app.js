
var app = angular.module('starter', ['ionic']);

var notes = [
    {
      id: '1',
      title: "First note",
      description: "This is my first note description"
    },
    {
      id: '2',
      title: "Second note",
      description: "This is my second note description"
    }
  ];

function getNote(noteID){
  for ( var i = 0; i < notes.length; i++){
    if (notes[i].id === noteID){
      console.log(notes[i].title);
      return notes[i];
    }
  }
  return undefined;
}

function updateNote(note){
  for ( var i = 0; i < notes.length; i++){
    if (notes[i].id === note.id){
      notes[i] = note;
      return;
    }
  }
}

app.controller('ListCtrl', function($scope) {

  $scope.notes = notes;

});

app.controller('EditCtrl', function($scope, $state) {

  //$scope.gotId = $state.params.noteId;
  $scope.note = angular.copy(getNote($state.params.noteId));


  $scope.save = function(){
    updateNote($scope.note);
    $state.go('list');
  }

});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  });

  $stateProvider.state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/list');

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
