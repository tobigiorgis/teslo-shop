
import { IProduct } from '@/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../database/db';
import { Product } from '@/models';
import { db } from '@/database';

type Data = 
| {message: string}
| IProduct

export default function handler(req:NextApiRequest, res:NextApiResponse) {


    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' })
    }

    


}

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse) {
    
    await db.connect();
    const { slug } = req.query;
    const product = await Product.findOne({slug}).lean();

    await db.disconnect();

    if (!product) {
        return res.status(404).json({ message: 'Product not found' })
    }

    return res.json(product)
}
