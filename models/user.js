const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Pas de prénom'],
    },
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    surname: {
        type: String,
        required: [true, "Pas de pseudo"],
    },
    mail: {
        type: String,
        required: [true, "Pas de mail"],
    },
    password: {
        type: String,
        required: [true, "Pas de mot de passe"],
    },
    img: {
        type: String,
        required: [true, "Pas d'image"],
    },
    articles: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'articles',
        }]
    }

})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel