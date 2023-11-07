import { db } from '@/database';
import { User } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '@/utils';
import { log } from 'console';

type Data = 
| {message: string}
| {
    token: string;
    user: {
        email: string;
        role: string;
        name: string;
    }
}

export default function handler(req:NextApiRequest, res:NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return registerUser(req, res);

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }


}
    const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
        
        const {email = '', password = '', name = ''} = req.body as {email: string, password: string, name: string};



        if (password.length < 6) {
            return res.status(404).json({message: 'La contraseña debe tener al menos 6 caracteres'})
        }

        if (name.length < 3) {
            return res.status(404).json({message: 'El nombre debe tener al menos 3 caracteres'})
        }
        
        // TODO: validar email
        if (!validations.isEmail(email)) {
            return res.status(400).json({message: 'El email no tiene el formato adecuado'})
        }

        await db.connect();
        const user = await User.findOne({email});

        if (user) {
            return res.status(404).json({message: 'El correo ya está registrado'})
        }

        

        const newUser = new User({
            email: email.toLocaleLowerCase(),
            password: bcrypt.hashSync(password),
            role: 'client',
            name,
        })

        try {
            await newUser.save({validateBeforeSave: true});
        } catch (error) {
            log(error);
            return res.status(500).json({message: 'Revisar logs del servidor'})
        }

        const {_id, role} = newUser;

        const token = jwt.signToken(_id, email);

        return res.status(200).json({
            token, //jwt
            user: {
                email, 
                role, 
                name
            }
        })

        

    }