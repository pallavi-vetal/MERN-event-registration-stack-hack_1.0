const mongo_util = require('../../utils/mongo.util');
const mongo_config = require('../../configurations/mongo.config');

exports.registerEvent = async (p_registration_details) => {
    try {
        let { sendMail } = require('../../services/mail/service.mail');
        let dateFormat = require('dateformat');
        let mongo_client = await mongo_util.dbClient();
        p_registration_details.date = new Date();
        let response = await mongo_client.collection(mongo_config.collection_names.registeredEvents).insertOne(p_registration_details);
        response.result.insertedId = response.insertedId;

        if (response.result.n == 1) {
            p_registration_details.date = dateFormat(p_registration_details.date, `ddd dS mmm yyyy hh:MM:ss TT`);
            sendMail(p_registration_details);
        }
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
        let dateFormat = require('dateformat');
        let mongo_client = await mongo_util.dbClient();
        let response = await mongo_client.collection(mongo_config.collection_names.registeredEvents).find({}).sort({ date: -1 }).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                result[i].date = dateFormat(result[i].date, `ddd dS mmm yyyy hh:MM:ss TT`);
            }
            return (result);
        }).catch(err => {
            throw err;
        });
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

exports.getImageById = async (req, res) => {
    try {
        let { errorObject } = require('../../utils/error');
        let { GridFSBucket, ObjectId } = require('mongodb');
        let mongo_client = await mongo_util.dbClient();
        let image_id = new ObjectId(req.params.id);
        let buffer_object = null;

        let bucket = new GridFSBucket(mongo_client, {
            bucketName: 'fs'
        });

        let download_stream = bucket.openDownloadStream(image_id);

        download_stream.on('data', (chunk) => {
            buffer_object = chunk;
        });

        download_stream.on('error', () => {
            return (res.status(500).json(errorObject('Error retreiving file from storage.', 500)));
        });

        download_stream.on('end', () => {
            res.status(200).json({ 'id': image_id, 'imageBuffer': buffer_object });
        });

    } catch (error) {
        throw error;
    }
};

exports.getTimeSeriesDataForCurrentMonth = async (month) => {
    try {
        let mongo_client = await mongo_util.dbClient();
        let month_list = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        let from_date = new Date();
        from_date = from_date.setMonth(month);
        // console.log("month passed: ",month);
        from_date = new Date(from_date).setDate(1);

        let to_date = new Date(from_date).setMonth(new Date(from_date).getMonth() + 1);

        from_date = new Date(from_date).setHours(00, 00, 00, 00);
        to_date = new Date(to_date).setHours(00, 00, 00, 00);
        // console.log("from : ",from_date,"to : ",to_date)
        let response = await mongo_client.collection(mongo_config.collection_names.registeredEvents).aggregate([
            {
                '$match': { 'date': { '$gte': new Date(from_date), '$lt': new Date(to_date) } }
            }, {
                '$group': {
                    '_id': {
                        'day': { '$dayOfMonth': '$date' },
                        'month': { '$month': '$date' },
                        'year': { '$year': '$date' }
                    },
                    'totalAmount': { '$sum': '$numberOfTickets' },
                    'count': { '$sum': 1 }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'day': '$_id.day',
                    'month': '$_id.month',
                    'year': '$_id.year',
                    'totalTicketsPerDay': '$totalAmount',
                    'registeredCount': '$count'
                }
            }
        ]).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                result[i].month = month_list[result[i].month - 1]
            }
            return (result);
        }).catch(err => {
            if (err) throw err;
        });
        return (response);
    } catch (error) {
        throw error;
    }
};

exports.submitFeedback = async (p_body) => {
    try {
        let mongo_client = await mongo_util.dbClient();
        p_body.date = new Date();
        let response = await mongo_client.collection(mongo_config.collection_names.feedbacks).insertOne(p_body);
        response.result.insertedId = response.insertedId;
        return (response.result);
    } catch (error) {
        throw error;
    }
};

exports.getAllFeedbacks = async () => {
    try {
        let dateFormat = require('dateformat');
        let mongo_client = await mongo_util.dbClient();
        let response = await mongo_client.collection(mongo_config.collection_names.feedbacks).find({}).sort({ date: -1 }).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                result[i].date = dateFormat(result[i].date, `ddd dS mmm yyyy hh:MM:ss TT`);
            }
            return (result);
        }).catch(err => {
            throw err;
        });

        return (response);
    } catch (error) {
        throw error;
    }
};
