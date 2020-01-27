// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');

var bucketName = 'lcloud-427-ts' + uuid.v4();
var keyName = 'AKIAS464CIUF2WLQ6E7X4k63ImEjRHoWD2/B/mwZ/7vn+cd5K/+7diOXaVBP';

var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

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
