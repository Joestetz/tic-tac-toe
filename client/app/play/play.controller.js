'use strict';

angular.module('xoApp')
  .controller('PlayCtrl', function ($scope, $window) {
    $scope.players = [{
      point: 1,
      name: 'Player 1',
      piece: 'x'
    }, {
      point: -1,
      name: 'Player 2',
      piece: 'o'
    }];
    
    $scope.boardSize = 3;
    $scope.boardSizeArr = new Array($scope.boardSize);
    $scope.currentPlayer = $scope.players[0];
    $scope.moves = [];
    $scope.gameOver = false;
    $scope.error = { hasError: false, message: '' };
    
    // winner is determined by any given array value of +boardSize or -boardSize
    $scope.scores = [];
    for (var i = 0; i < $scope.boardSize * 2 + 2; i++) {
      $scope.scores.push(0);
    }
    
    // check for a winner
    $scope.checkWinner = function () {
      var winngLines = jQuery.grep($scope.scores, function (val) {
        return Math.abs(val) === $scope.boardSize;
      });
      
      if(winngLines.length > 0) {
        return true;
      }
      
      return false;
    };
    
    // do stuff when a move is executed (called from xoCell)
    $scope.executeMove = function (row, col) {
      row = parseInt(row);
      col = parseInt(col);
      $scope.moves.push( { row: row, col: col, player: $scope.currentPlayer } );
      
      var point = $scope.currentPlayer.point;
      $scope.scores[row] += point;
      $scope.scores[$scope.boardSize + col] += point;
      if (row === col) {
        $scope.scores[2 * $scope.boardSize] += point;
      }
      if ($scope.boardSize - 1 - col === row) {
        $scope.scores[2 * $scope.boardSize + 1] += point;
      }
      
      if ($scope.checkWinner()) {
        $window.alert($scope.currentPlayer.name + ' won!');
        $scope.gameOver = true;
        return;
      }
      
      if($scope.moves.length === $scope.boardSize * $scope.boardSize) {
        $scope.error = { hasError: true, message: 'Cat\'s game!  It\'s a tie!' };
        $scope.gameOver = true;
        return;
      }
      
      $scope.nextPlayer();
      $scope.error.hasError = false;
    };
    
    // advance current player
    $scope.nextPlayer = function( ) {
      var numPlayers = $scope.players.length;
      var playerPosition = jQuery.inArray($scope.currentPlayer, $scope.players);

      if (playerPosition >= numPlayers || playerPosition === -1) {
        throw new Error('Error Code GB001 - Player index out of range.');
      }
      
      if (playerPosition === numPlayers-1) {
        $scope.currentPlayer = $scope.players[0];
        return;
      }
      
      $scope.currentPlayer = $scope.players[playerPosition+1];
    };
    
    // start a new game
    $scope.newGame = function () {
      $scope.moves.length = 0;
      $scope.error.hasError = false;
      $scope.currentPlayer = $scope.players[0];
      $scope.gameOver = false;
      
      $scope.scores.length = 0;
      for (var i = 0; i < $scope.boardSize * 2 + 2; i++) {
        $scope.scores.push(0);
      }
    };
  });
