const AWS = require('aws-sdk');
const transcribe = new AWS.TranscribeService();

exports.handler = async (event) => {
  const { Records } = event;
  
  for (const record of Records) {
    const bucketName = record.s3.bucket.name;
    const objectKey = record.s3.object.key;
    
    const params = {
      TranscriptionJobName: `transcription-${Date.now()}`,
      LanguageCode: 'en-US',
      Media: {
        MediaFileUri: `s3://${bucketName}/${objectKey}`
      },
      OutputBucketName: process.env.OUTPUT_BUCKET
    };
    
    try {
      await transcribe.startTranscriptionJob(params).promise();
      console.log('Transcription job started');
    } catch (error) {
      console.error('Transcription error:', error);
    }
  }
  
  return { statusCode: 200 };
};
