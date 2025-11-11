import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        // maxlength: 21,
        trim:true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: function(this: any){
            return !this.googleId;
        },
        minlength: 6
    },
    googleId: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: "/materials/default-avatar.png"
    },
    role: {
        type: String,
        default: "user"
    }
}, {timestamps: true})

export default mongoose.models.User || mongoose.model("User", UserSchema)