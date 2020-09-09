const express = require('express')

const FileHandler = require('./Handlers/File');
const LogHandler = require('./Handlers/Log');
const ReportHandler = require('./Handlers/Report');

const app = express()

app.get('/', async (req, res) => {
    const fileHandler = new FileHandler('./Logs/qgames.log');
    const logHandler = new LogHandler();
    const reportHandler = new ReportHandler();

    const fileContent = await fileHandler.readFile();

    // TASK 3 -> The DeathCause is included (or not) in the createBasicReport function
    const includeDeathCause = Boolean(req.query.death_cause);
    
    // TASK 1
    await logHandler.createBasicReport(fileContent, reportHandler, includeDeathCause);

    // TASK 2
    if (req.query.ranking) {
        reportHandler.createRanking(
            await logHandler.ordPlayerKills(reportHandler.getReports().games)
        )
    }

    res.json(reportHandler.getReports());
})

app.listen(3000, () => {
    console.log(`CloudWalk Test is running on port 3000`);
})