'use strict';

angular.module('xoApp')
  .value('boardSize', 3)
  .controller('PlayCtrl', function ($scope, playerFactory, scoreFactory, xoNotify, boardSize) {
    $scope.players = playerFactory.getPlayers();
    $scope.boardSizeArr = new Array(boardSize);
    $scope.currentPlayer = $scope.players[0];
    
    $scope.gameOver = false;
    $scope.moveCount = 0;
    
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
      
      $scope.currentPlayer = playerFactory.nextPlayer($scope.currentPlayer);
    };
    
    // start a new game
    $scope.newGame = function () {
      $scope.currentPlayer = $scope.players[0];
      $scope.gameOver = false;
      $scope.moveCount = 0;
      scoreFactory.reset();
      xoNotify.clear();
    };
  });
