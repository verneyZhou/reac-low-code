/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from 'mongodb';
import DB from '../db/config.js';

// const ObjectId = mongodb.ObjectId;
// console.log('===getDetail===ObjectId', ObjectId);

export default async function (req, res) {
    if (String(req.method).toLowerCase() !== 'get') {
        res.status(500).json({
            error: {
                message: `Method ${String(res.method)} is not allowed`,
            },
        });
        return;
    }
    const { id } = req.query;
    // 连接MongoDB
    const client = await MongoClient.connect(DB.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        const db = await client.db(DB.database); // 获取数据库
        const list = await db.collection(DB.collection); // 获取集合
        const result = await list.findOne({id: Number(id)}); // 获取集合中的所有数据
        console.log('===getDetail===result', result);
        res.status(200).json({
            code: 200,
            msg: 'success',
            data: result || null,
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
