const mongoose = require('mongoose');

const ForgetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type:String
    },
    token: {
        type: String,
    },
   
}, { timestamps: true })

export default mongoose.models.Forget || mongoose.model("Forget", ForgetSchema);