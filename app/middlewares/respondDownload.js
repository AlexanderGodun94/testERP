const fs = require('fs');
const errorMessages = require('../services/errorMessages');

async function respond(res, status, promise) {
    try {
        const filePath = await promise;
        fs.stat(filePath, (err, stats) => {
            if (err) return res.status(404).json({message: errorMessages.FILE_NOT_FOUND});
            res.download(filePath, (err) => {
                if (err) return res.status(500).json({message: errorMessages.ERROR_DOWNLOAD});
            });
        });
    } catch (err) {
        res.status(err.status || 500).json(err)
    }
}

module.exports = respond;
