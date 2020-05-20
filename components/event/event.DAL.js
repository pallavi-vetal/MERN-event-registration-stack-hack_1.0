const mongo_util = require('../../utils/mongo.util');
const mongo_config = require('../../configurations/mongo.config');

exports.registerEvent = async (p_registration_details) => {
    try {
        let mongo_client = await mongo_util.dbClient();
        let response = await mongo_client.collection(mongo_config.collection_names.registeredEvents).insertOne(p_registration_details);

        response.result.insertedId = response.insertedId;

        return (response.result);
    } catch (error) {
        throw error;
    }
};

exports.uploadImage = (req, res) => {
    try {
        let uploadFile = req.files.file
        const fileName = req.files.file.name
        uploadFile.mv(
            `${fileName}`,
            async function (err) {
                if (err) {
                    return res.status(500).send(err)
                }
                var mongo = require('mongodb');
                var Grid = require('gridfs-stream');
                const fs = require('fs');
                // create or use an existing mongodb-native db instance
                let mongo_client = await mongo_util.dbClient();
                var GridFS = Grid(mongo_client, mongo);
                let user_defined_error = require('../../utils/error');
                // streaming to gridfs

                var writestream = GridFS.createWriteStream({
                    filename: fileName
                });
                writestream.on('close', function (file) {
                    return (res.status(201).json({ message: `Image uploaded successfully with ObjectID : ${file}` }));
                });
                fs.createReadStream(fileName).pipe(writestream);

            }
        )


    } catch (error) {
        throw error;
    }
};
