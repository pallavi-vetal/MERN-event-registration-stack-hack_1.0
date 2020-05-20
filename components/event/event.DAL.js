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

exports.uploadImage = async (req, res) => {
    try {
        
        const mongodb = require('mongodb');
        const { Readable } = require('stream');
        const multer = require('multer');
        const readable_photo_stream = new Readable();

        let storage = multer.memoryStorage();
        let upload = multer({ storage: storage });
        let mongo_client = await mongo_util.dbClient();
        let user_defined_error = require('../../utils/error');

        await upload.single('resourceName')(req, res, (err) => {
            if (err) {
                return (res.status(400).json(user_defined_error.errorObject('Upload request validation failed.', 400)));
            } else if (!req.body.name) {
                return (res.status(400).json(user_defined_error.errorObject('No photo name in the requested body', 400)));
            }

            let photo_name = req.body.name;

            readable_photo_stream.push(req.file.buffer);
            readable_photo_stream.push(null);

            let bucket = new mongodb.GridFSBucket(mongo_client, { bucketName: mongo_config.collection_names.photos });

            let upload_stream = bucket.openUploadStream(photo_name);
            let id = upload_stream.id;

            readable_photo_stream.pipe(upload_stream);


            upload_stream.on('error', () => {
                return (res.status(500).json(user_defined_error.errorObject('Error uploading file.', 500)));
            });

            upload_stream.on('finish', () => {
                return (res.status(201).json({ message: `Image uploaded successfully with ObjectID : ${id}` }));
            });
        });
    } catch (error) {
        throw error;
    }
};
