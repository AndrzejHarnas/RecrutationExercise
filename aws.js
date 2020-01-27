// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');

const fs =require('fs');

var bucketName = 'lcloud-427-ts' + uuid.v4();
var keyName = '4k63ImEjRHoWD2/B/mwZ/7vn+cd5K/+7diOXaVBP';

var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName+'test'}).promise();

bucketPromise.then(
  function(data) {
    var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
    var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
    uploadPromise.then(
      function(data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      });
}).catch(
  function(err) {
    console.error(err, err.stack);
});

s3 = new AWS.S3({apiVersion: '2006-03-01'});
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});



const fileName = 'fileToUpload.txt';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'lcloud-427-ts',
         Key: 'fileToUpload',
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

uploadFile();

var params = {
 Bucket: 'lcloud-427-ts',
  Delimiter: '',
  Prefix: 'file'
}

s3.listObjects(params, function (err, data) {
  if(err)throw err;
  console.log(data);
});
