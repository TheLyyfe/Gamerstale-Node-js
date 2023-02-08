const express = require("express");
const UserModel = require('../models/user.js')
// const LoginModel = require('../models/login.js')
const upload = require('../services/multer.js')
const crypto = require('../customDependances/crypto.js')
const routeGuard = require('../customDependances/authGuard.js')


const userRouter = express.Router()

userRouter.get('/main', async (req, res) => {
   try {
      let user = await UserModel.findOne({ _id: req.session.userId });
      res.render('templates/main.twig', 
      {
         user: user
      }
      )
      // console.log(user);
   } catch (err) {
      res.send(err);
   }
})

// projectRouter.get('/deleteProject/:id', async (req, res) => {
//    try {
//       await ProjectModel.deleteOne({ _id: req.params.id });
//       res.redirect('/projects')
//    } catch (err) {
//       console.log(err);
//       res.send(err);
//    }
// })

userRouter.get('/inscription', async (req, res) => {
   try {
      res.render('templates/inscript.twig')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

userRouter.post('/inscription', upload.single("img"), async (req, res) => {
   console.log(req.body);
   try {
      req.body.img = req.file.filename
      req.body.password = await crypto.cryptPassword(req.body.password)
      let user = new UserModel(req.body)
      await user.save()
      res.redirect('/main')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

// projectRouter.get('/updateProject/:id', async (req, res) => {
//    try {
//       res.render('updateproject.twig', {
//          projectid : req.params.id
//       })
//    } catch (err) {
//       console.log(err);
//       res.send(err);
//    }
// })

// projectRouter.post('/updateProject/:id', async (req, res) => {
//    console.log(req.body);
//    try {
//      await ProjectModel.updateOne({_id: req.params.id},req.body)
//       res.redirect('/projects')
//    } catch (err) {
//       console.log(err);
//       res.send(err);
//    }
// })

userRouter.get('/login', async (req, res) => {
   try {
      res.render('templates/login.twig')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})


userRouter.post('/login', async (req, res) => {
   try {
      let user = await UserModel.findOne({surname: req.body.surname})
      if (user) {
         if (await crypto.comparePassword(req.body.password, user.password)) {
            req.session.userId = user._id
            res.redirect('/main')
         } else {
            throw "Mot de pass incorrect"
         }
      } else {
         throw "pseudo ou mot de passe incorrect"
      }
      
      
   } catch (err) {
      req.session.error = err
      console.log(err);
      res.redirect("/main")
   }

})

userRouter.get('/logout', async (req, res) => {
   try {
   req.session.destroy();
   res.redirect('/main')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
   
})


module.exports = userRouter


