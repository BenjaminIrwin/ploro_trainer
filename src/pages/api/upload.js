import { randomUUID } from 'crypto'
import JSZip from 'jszip'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import multiparty from "multiparty";


export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req, res) {
    // Check if POST request else return 405
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed, please use POST' })
        return
    }

    const form = new multiparty.Form();
    const data = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
        if (err) reject({ err });
        resolve({ fields, files });
        });
    });
    const formData = JSON.stringify(data);
    console.log(formData);
    // {"fields":{},"files":{"file":[{"fieldName":"file","originalFilename":"test.zip","path":"/var/folders/42/lnr7p0yn0_39q4bpkhwf250w0000gn/T/N7wA3J8fbkjG1dqqz3M2A937.zip",
    // "headers":{"content-disposition":"form-data; name=\"file\"; filename=\"test.zip\"","content-type":"application/zip"},"size":375}]}}

    // Get path from formData
    const path = data.files.file[0].path
    console.log(path);

    // Get zip from path
    const zip = new JSZip()
    const zipFile = await zip.loadAsync(path)

    console.log(3)

    // Get zip from path
    // const zip = new JSZip()
    // const zipFile = await zip.loadAsync(req.body.file)

    // console.log(3)

    console.log('Preparing S3')
    // Upload zip to S3
    // const s3 = new S3Client({
    //     region: 'eu-west-2',
    //     credentials: {
    //       accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    //       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    //     },
    //   })
    const bucketName = 'lightsketch-bucket'
    const filename = randomUUID() + '.zip'
    // const params = {
    //     Bucket: bucketName,
    //     Key: filename,
    //     Body: req.body.file,
    //     ContentType: 'application/zip'
    // }

    // const command = new PutObjectCommand(params);

    // console.log('Uploading zip to S3')
    // const data = await s3.send(command);
    // console.log(data);

    const fileUrl = `https://${bucketName}.s3.amazonaws.com/${filename}`

    console.log(fileUrl)

    res.status(200).json({ url: fileUrl })
}