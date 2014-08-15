'use strict';

angular.module('xoApp')
  .factory('playerFactory', function (xoNotify) {
    var players = [{
      point: 1,
      name: 'Player 1',
      piece: 'x'
    }, {
      point: -1,
      name: 'Player 2',
      piece: 'o'
    }];

    // Public API here
    return {
      getPlayers: function () {
        return players;
      },
      setPlayers: function(newPlayers) {
        players = newPlayers;
      },
      nextPlayer: function(currentPlayer) {
        var numPlayers = players.length;
        var playerPosition = jQuery.inArray(currentPlayer, players);

        if (playerPosition >= numPlayers || playerPosition === -1) {
          xoNotify.error('Player not found.');
        }
        
        if (playerPosition === numPlayers-1) {
          return players[0];
        }
        
        return players[playerPosition+1];
      }
    };
  });
