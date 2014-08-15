'use strict';

angular.module('xoApp')
  .value('boardSize', 3)
  .controller('PlayCtrl', function ($scope, playerFactory, scoreFactory, xoNotify, boardSize) {
    $scope.players = playerFactory.getPlayers();
    $scope.boardSizeArr = new Array(boardSize);
    $scope.gameOver = false;
    $scope.moveCount = 0;
    
    $scope.$watch( playerFactory.getCurrentPlayer, function ( newVal ) {
      $scope.currentPlayer = newVal;
    });
    
    // do stuff when a move is executed (called from xoCell)
    $scope.executeMove = function(row, col) {
      $scope.moveCount = scoreFactory.executeMove(row, col, $scope.currentPlayer);
      
      if (scoreFactory.checkWinner()) {
        xoNotify.success($scope.currentPlayer.name + ' won!');
        $scope.gameOver = true;
        return;
      }
      
      if($scope.moveCount === boardSize * boardSize) {
        xoNotify.error('Cat\'s game!  It\'s a tie!');
        $scope.gameOver = true;
        return;
      }
      
      playerFactory.nextPlayer();
    };
    
    // start a new game
    $scope.newGame = function () {
      playerFactory.reset();
      scoreFactory.reset();
      xoNotify.clear();
      $scope.gameOver = false;
      $scope.moveCount = 0;
    };
  });
