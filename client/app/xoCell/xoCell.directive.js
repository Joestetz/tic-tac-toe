'use strict';

angular.module('xoApp')
  .directive('xoCell', function ($timeout, xoNotify, playerFactory) {
    return {
      templateUrl: 'app/xoCell/xoCell.html',
      restrict: 'E',
      scope: {},
      link: function (scope, element, attrs, ctrl) {
        scope.gamepiece = 'blank';
        scope.isDirty = false;
        
        // clear out game piece if new game is started
        scope.$watch('$parent.moveCount', function (newVal) {
          if(newVal === 0) {
            scope.gamepiece = 'blank';
            scope.isDirty = false;
          }
        });
        
        // place the player's game piece
        scope.place = function () {
          // game is over
          if (scope.$parent.gameOver) {
            xoNotify.error('The game has ended. No more moves allowed.');
            return;
          }
          
          // cannot overwrite game piece
          if (scope.isDirty) {
            xoNotify.error('This cell has already been taken.');
            return;
          }
          
          // place the player's gamepiece and tell controller what was done
          scope.gamepiece = playerFactory.getCurrentPlayer().piece;
          scope.$parent.executeMove(attrs.row, attrs.col);
          scope.isDirty = true;
        };
      }
    };
  });