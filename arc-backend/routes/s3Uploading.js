const fs = require('fs');
const AWS = require('aws-sdk');
const s3CreatingBucket = require('./s3CreatingBucket.js');
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// const checkBucketExists = async bucket => {
//   const s3 = new AWS.S3();
//   const options = {
//     Bucket: bucket,
//   };
//   try {
//     await s3.headBucket(options).promise();
//     return true;
//   } catch (error) {
//     if (error.statusCode === 404) {
//       return false;
//     }
//     throw error;
//   }
// };
const s3UploadingFile = (fileName,bucketName,nameInS3) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: bucketName,
        Key: nameInS3, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

module.exports = s3UploadingFile;
s3UploadingFile('./../config/passport.js','arc-testing-bucket-2','test2.js');