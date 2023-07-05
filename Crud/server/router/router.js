const express = require('express');
const axios = require('axios')
const route = express.Router();
const controller = require('../controller/controller');
const collection = require('../../database/mongodb')




route.get("/", (req, res) => {
    // res.render("login")
    if (req.session.userId) {
      return res.redirect("/api/users"); // Redirect to the user's account page if already logged in
    }
    res.render("login")
})


route.get("/add-user",(req, res) => {
    res.render("add_user")
})



// getting signup detailes to database 
route.get("/signup", (req, res) => {

    res.render("signup", { message: "" });
})

route.get("/login", (req, res) => {
    res.render("login", {message: ""});
  });

route.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log('Error destroying session:', err);
      }
      res.redirect('/login');
    });
});


// route.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.log('Error destroying session:', err);
//     }
//     // Clear the session data and redirect to the login page
//     req.session = null;

//     // Replace the current page in the history stack with the login page
//     res.setHeader('Cache-Control', 'no-store');
//     res.redirect('/login');
//   });
// });


  

// finding signup detailes from database and giving page
// route.post('/login', async (req, res) => {

//     try {
//         const check = await collection.findOne({ username: req.body.username || req.body.id})
//         if (check.password === req.body.password) {

//             console.log("login success");
//             req.session.id = req.body.id
//             req.session.username = req.body.username
//             req.session.password = req.body.password
//             console.log("session");
//            res.redirect('/api/users');

//         }
//         else {
//             res.render("login")
//             console.log("login failed");
//         }
//     }
//     catch {
//         res.render("login")
//         console.log("login failed2");
//     }

// })
// route.get('/api/users',controller.sessionChecker,(req, res)=> {
//     res.render("index") 
// })

// api
route.post('/api/users',controller.sessionChecker, controller.create);
route.get('/api/users',controller.sessionChecker, controller.find);
route.post('/login', controller.loginUser);
route.post('/signup', controller.signUpUser); 
route.put('/api/users/:id',controller.sessionChecker, controller.update);
route.delete('/api/users/:id',controller.sessionChecker, controller.delete);
route.get('/update-user',controller.showUpdateDetails)


module.exports = route;