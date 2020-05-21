const mongo_util = require('../../utils/mongo.util');
const mongo_config = require('../../configurations/mongo.config');

exports.registerEvent = async (p_registration_details) => {
    try {
        let mongo_client = await mongo_util.dbClient();
        p_registration_details.date= new Date();
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
				let uploadFile = req.files.file;
			
        uploadFile.mv( `${fileName}`, async (err) => {
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
                    console.log("file change: ",file._id);
                    return res.status(200).json({"id":file._id});
								});

								writestream.on('error', () => {
										return (res.status(500).json(user_defined_error.errorObject('Error uploading file.', 500)));
								});

                fs.createReadStream(fileName).pipe(writestream);

                fs.unlink(fileName, (err) => {
                    if (err) throw err;
                    console.log(fileName, ' deleted');
                });
        });
    } catch (error) {
        throw error;
    }
};
