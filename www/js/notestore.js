angular.module('meomeonotes.notestore', [])
  .factory('NoteStore', function(){

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