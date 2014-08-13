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
        scope.$watch('$parent.moves.length', function (newVal) {
          if(newVal === 0) {
            scope.gamepiece = 'blank';
            scope.isDirty = false;
          }
        });
        
        // place the player's game piece
        scope.place = function () {
          // game is over
          if (scope.$parent.gameOver) {
            scope.throwError('The game has ended. No more moves allowed.', 'GC002');
          }
          
          // cannot overwrite game piece
          if (scope.isDirty) {
            scope.throwError('This cell has already been taken.', 'GC001');
          }
          
          // place the player's gamepiece and tell controller what was done
          scope.gamepiece = scope.$parent.currentPlayer.piece;
          var exec = function () {
            scope.$parent.executeMove(attrs.row, attrs.col);
          };
          $timeout(exec, 10);
          scope.isDirty = true;
        };
        
        scope.throwError = function (msg, code) {
          var err = (code !== undefined) ? 'Error Code ' + code + ' - ' + msg : msg;
          scope.$parent.error.hasError = true;
          scope.$parent.error.message = msg;
          throw new Error(err);
        };
      }
    };
  });