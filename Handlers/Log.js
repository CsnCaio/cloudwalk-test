class LogHandler {
    async createBasicReport(fileContent, reportHandler, includeDeathCause) {
        let gameId = null;
        for await (const line of fileContent) {
            // Here we'll do some actions to create a report

            const gameEvent = this.getGameEvent(line);
            if (!gameEvent) {
                continue;
            }

            switch (gameEvent.event) {
                case 'GAME_STARTED':
                    gameId = reportHandler.startNewGame();
                    break;

                case 'PLAYER_WAS_KILLED':
                    reportHandler.registerKill(gameId, gameEvent.details, includeDeathCause);
                    break;

                case 'GAME_ENDED':
                    reportHandler.endGame(gameId);
                    break;
            }
        }
    }

    getGameEvent(logLine) {
        if (logLine.includes('InitGame:'))
            return { event: 'GAME_STARTED' };

        if (logLine.includes('ShutdownGame:'))
            return { event: 'GAME_ENDED' };

        if (logLine.includes('Kill:'))
            return { event: 'PLAYER_WAS_KILLED', details: this._getKillDetails(logLine) };

        return null;
    }

    async ordPlayerKills(games) {
        let ranking = {};

        // First, we collect the entire game data
        for await (const game of games) {
            for await (const [player, kills] of Object.entries(game.kills)) {
                if (!ranking[player]) {
                    ranking[player] = 0;
                }
                ranking[player] += kills;
            }
        }

        // Now, we need to transform to array and then sort
        const sortedRanking = Object.entries(ranking).sort((a, b) => {
            // To ORD DESC, you need to invert the return values
            if (a[1] < b[1]) {
                return 1;
            }
            if (a[1] > b[1]) {
                return -1;
            }
            return 0;
        });

        // We need to empty the ranking to get the new order
        ranking = {};

        // Finally, re-transforming to object
        for (const item of sortedRanking) {
            ranking[item[0]] = item[1];
        }

        return ranking;
    }

    _getKillDetails(logLine) {
        const [, , , , , killer, , killed, , deathCause] = logLine.trim().split(' ');

        return { killer, killed, deathCause };
    }
}

module.exports = LogHandler;