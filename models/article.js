const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, 'Pas de titre'],
    },
    article: {
        type: String,
        required: [true, "Pas d'article"],
    },
    user: {
        type: String,
        required: [true, "Pas d'auteur"],
    },
    commentaires:{
        
    }
})

const ArticleModel = mongoose.model('article', articleSchema);

module.exports = ArticleModel