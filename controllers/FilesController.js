import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const { ObjectId } = require('mongodb');
const uuid4 = require('uuid').v4;
const fs = require('fs');

const rootDir = process.env.FOLDER_PATH || '/tmp/files_manager';

class FilesController {
  static async postUpload(req, res) {
    // get files collection
    const files = await dbClient.db.collection('files');

    // retrieve user based on token
    const token = req.headers['x-token'];
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) return res.status(401).send({ error: 'Unauthorized' });

