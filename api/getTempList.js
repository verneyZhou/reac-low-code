/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from 'mongodb';
import DB from '../db/config.js';

export default async function (req, res) {
    // 连接MongoDB
    const client = await MongoClient.connect(DB.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        const db = await client.db(DB.database); // 获取数据库
        const list = await db.collection(DB.collection); // 获取集合
        const result = await list.find({}).toArray(); // 获取集合中的所有数据
        console.log('===getlist===result', result);
        res.status(200).json({
            code: 200,
            msg: 'success',
            data: [...(result || [])],
        });
    } catch (err) {
        console.log('===getlist===err', err);
        res.status(400).json({
            code: 400,
            msg: JSON.stringify(err),
        });
    } finally {
        client.close(); // 关闭连接
    }
}
