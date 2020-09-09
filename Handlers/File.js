const readline = require('readline');
const fs = require('fs');

class FileReader {

    constructor(filePath) {
        this.filePath = filePath;
    }

    async readFile(callback) {
        try {
            const lines = [];

            const readInterface = readline.createInterface({
                input: fs.createReadStream(this.filePath),
                output: null,
                console: false
            });

            for await (const line of readInterface) {
                lines.push(line);
            }

            return lines;
        } catch (error) {
            console.log("FileReader -> parseFileContent -> error", error)
            return error
        }
    }
}

module.exports = FileReader;