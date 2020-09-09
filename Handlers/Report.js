class ReportHandler {
    constructor() {
        this.reports = {
            games: []
        };
    }

    startNewGame() {
        const gameId = this.reports.games.length;
        this.reports.games.push({ total_kills: 0, players: [], kills: {} });
        return gameId;
    }

    registerKill(gameId, killDetails, includeDeathCause) {
        this._incrementTotalKills(gameId);

        if (includeDeathCause) {
            this._incrementDeathCauses(gameId, killDetails.deathCause);
        }

        this._registerKiller(gameId, killDetails.killer);

        this._registerKilled(gameId, killDetails.killed, killDetails.killer);
    }

    createRanking(ranking) {
        this.reports.ranking = ranking;
    }

    createDeathCauseRanking(ranking) {
        this.reports.deathCauses = ranking;
    }

    endGame(gameId) {
        if (!this.reports.games[gameId].total_kills) {
            this.reports.games.splice(gameId, 1);
        }
    }

    getReports() {
        return this.reports;
    }

    // PRIVATE METHODS
    _incrementTotalKills(gameId) {
        // "The counter total_kills includes player and world deaths."
        this.reports.games[gameId].total_kills++;
    }

    _incrementDeathCauses(gameId, deathCause) {
        if (!this.reports.games[gameId].deathCauses) {
            this.reports.games[gameId].deathCauses = {};
        }

        if (!this.reports.games[gameId].deathCauses[deathCause]) {
            this.reports.games[gameId].deathCauses[deathCause] = 0;
        }

        this.reports.games[gameId].deathCauses[deathCause]++;
    }

    _registerKiller(gameId, killer) {
        // "Since <world> is not a player, it should not appear in the list of players or in the dictionary of kills."
        if (killer !== '<world>') {
            // Adding killer to players array if not exists
            if (!this.reports.games[gameId].players.includes(killer)) {
                this.reports.games[gameId].players.push(killer)
            }
            // Incrementing killer score and creating if not exists
            if (!this.reports.games[gameId].kills.hasOwnProperty(killer)) {
                this.reports.games[gameId].kills[killer] = 0;
            }
            this.reports.games[gameId].kills[killer]++;
        }
    }

    _registerKilled(gameId, killed, killer) {
        // Adding killed to players array
        if (!this.reports.games[gameId].players.includes(killed)) {
            this.reports.games[gameId].players.push(killed)
        }

        // "When <world> kill a player, that player loses -1 kill score."
        if (killer === '<world>') {
            if (this.reports.games[gameId].kills[killed] > 0) {
                this.reports.games[gameId].kills[killed]--;
            }
        }
    }
}

module.exports = ReportHandler;