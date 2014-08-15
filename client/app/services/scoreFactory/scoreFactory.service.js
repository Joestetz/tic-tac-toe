'use strict';

angular.module('xoApp')
  .factory('scoreFactory', function (boardSize) {
    // winner is determined by any given array value of +boardSize or -boardSize
    var moves = [];
    var scores = [];
    
    var clearScores = function() {
      moves.length = 0;
      scores.length = 0;
      for (var i = 0; i < boardSize * 2 + 2; i++) {
        scores.push(0);
      }
    };
    
    clearScores();
  
    return {
      checkWinner: function () {
        var winngLines = jQuery.grep(scores, function (val) {
          return Math.abs(val) === boardSize;
        });
        
        if(winngLines.length > 0) {
          return true;
        }
        
        return false;
      },
      executeMove: function (row, col, currentPlayer) {
        row = parseInt(row);
        col = parseInt(col);
        moves.push( { row: row, col: col, player: currentPlayer } );
        
        var point = currentPlayer.point;
        scores[row] += point;
        scores[boardSize + col] += point;
        if (row === col) {
          scores[2 * boardSize] += point;
        }
        if (boardSize - 1 - col === row) {
          scores[2 * boardSize + 1] += point;
        }
        
        return moves.length;
      },
      reset: clearScores
    };
  });
