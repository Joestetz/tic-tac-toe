'use strict';

angular.module('xoApp')
  .directive('xoCell', function ($timeout) {
    return {
      templateUrl: 'app/xoCell/xoCell.html',
      restrict: 'E',
      scope: {},
      link: function (scope, element, attrs) {
        scope.gamepiece = 'blank';
        scope.isDirty = false;
        
        // clear out game piece if new game is started
        scope.$watch('$parent.moves.length', function (newVal, oldVal) {
          if(newVal == 0) scope.gamepiece = 'blank';
        });
        
        // place the player's game piece
        scope.place = function () {
          // cannot overwrite game piece
          if (scope.isDirty) {
            throw new Error('Error Code GC001 - This cell has already been taken.');
          }
          
          if (scope.$parent.gameOver) {
            throw new Error('Error Code GC002 - The game has ended. No more moves allowed.');
          }
          
          // place the player's gamepiece and tell controller what was done
          scope.gamepiece = scope.$parent.currentPlayer.piece;
          var exec = function () {
            scope.$parent.executeMove(attrs.row, attrs.col);
          };
          $timeout(exec, 10);
          scope.isDirty = true;
        };
      }
    };
  });