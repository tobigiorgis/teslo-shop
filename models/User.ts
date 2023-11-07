import { IUser } from "@/interfaces";
import mongoose, {  Schema, model, Model} from "mongoose";

// el UserSchema es para definir la estructura del usuario 

const userSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{ type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['admin', 'client'],
            message: '{VALUE} no es un rol valido',
            default: 'client',
            required: true
        }
    }
}, {
    timestamps: true
})


const User:Model<IUser> = mongoose.models.User || model('User', userSchema)


export default User;