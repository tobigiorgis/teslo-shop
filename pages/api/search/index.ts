import { NextApiRequest, NextApiResponse } from 'next';
import { type } from 'os';

type Data = {message: string}

export default function handler(req:NextApiRequest, res:NextApiResponse<Data>) {

    res.status(400).json({ message: 'Debe especificar el query de busqueda' })


}