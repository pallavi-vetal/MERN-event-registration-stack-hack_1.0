const mongo_util = require('../../utils/mongo.util');
const mongo_config = require('../../configurations/mongo.config');

exports.registerEvent = async (p_registration_details) => {
    try {
        let mongo_client = await mongo_util.dbClient();
        p_registration_details.date = new Date();
        let response = await mongo_client.collection(mongo_config.collection_names.registeredEvents).insertOne(p_registration_details);

        response.result.insertedId = response.insertedId;

        return (response.result);
    } catch (error) {
        throw error;
    }
};

exports.uploadImage = (req, res) => {
    try {
        const fs = require('fs');
        const fileName = req.files.file.name;
        let { errorObject } = require('../../utils/error');
        let uploadFile = req.files.file;

        if ((uploadFile.mimetype === 'image/jpeg') || (uploadFile.mimetype === 'image/png')) {
            uploadFile.mv(`${fileName}`, async (err) => {
                if (err) {
                    return res.status(500).send(err)
                }

                let mongo = require('mongodb');
                let mongo_client = await mongo_util.dbClient();
                let Grid = require('gridfs-stream');
                let GridFS = Grid(mongo_client, mongo);

                let writestream = GridFS.createWriteStream({
                    filename: fileName
                });

                writestream.on('close', (file) => {
                    //console.log("file change: ", file._id);
                    return res.status(200).json({ "id": file._id });
                });

                writestream.on('error', () => {
                    return (res.status(500).json(errorObject('Error uploading file.', 500)));
                });

                fs.createReadStream(fileName).pipe(writestream);

                fs.unlink(fileName, (err) => {
                    if (err) throw err;
                    console.log(fileName, ' deleted');
                });
            });
        } else {
            return (res.status(400).json(errorObject('File is of invalid type', 400)));
        }
    } catch (error) {
        throw error;
    }
};

exports.getAllRegisteredEvents = async () => {
    try {
        let mongo_client = await mongo_util.dbClient();
        let response = await mongo_client.collection(mongo_config.collection_names.registeredEvents).find({}).toArray();
        return (response);
    } catch (error) {
        throw error;
    }
};

exports.getCountOfRegistrationsAndTickets = async () => {
    try {
        let mongo_client = await mongo_util.dbClient();
        let response = await mongo_client.collection(mongo_config.collection_names.registeredEvents).aggregate([
            { '$group': { '_id': '$source', 'totalTickets': { '$sum': '$numberOfTickets' }, 'totalRegistrations': { '$sum': 1 } } },
            { '$project': { '_id': 0 } }
        ]).toArray().then(result => {
            return (result[0]);
        }).catch(err => {
            if (err) throw err;
        });
        return (response);
    } catch (error) {
        throw error;
    }
};

exports.getRegisteredEventById = async (p_registration_id) => {
    try {
        let { ObjectId } = require('mongodb');
        let mongo_client = await mongo_util.dbClient();
        let response = await mongo_client.collection(mongo_config.collection_names.registeredEvents).aggregate([
            { '$match': { '_id': new ObjectId(p_registration_id) } }
        ]).toArray().then(result => {
            return (result[0]);
        }).catch(err => {
            if (err) throw err;
        });
        return (response);
    } catch (error) {
        throw error;
    }
};

exports.getRegistrationTypeDetails = async () => {
    try {
        let mongo_client = await mongo_util.dbClient();
        let response = await mongo_client.collection(mongo_config.collection_names.registeredEvents).aggregate([
            { '$group': { '_id': { 'registrationType': '$registrationType' }, 'totalAmount': { '$sum': "$numberOfTickets" } } }
        ]).toArray().then(result => {
            return (result);
        }).catch(err => {
            if (err) throw err;
        });
        return (response);
    } catch (error) {
        throw error;
    }
};