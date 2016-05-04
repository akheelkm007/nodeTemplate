var express = require('express');
var router = express.Router();
var templateValue;
var session;



/* GET home page. */
router.get('/', function(req, res, next) {

  session = req.session;

  if(session.email) {
	templateValue = { name :session.email};
	res.render('index', templateValue );
  }

  else {
	res.redirect('/login');  	
  }

});


router.get('/login', function(req, res, next) {

  session = req.session;
  console.log("***********************",session.email);


  if(session.email) {
	res.redirect('/');  	
  }


	res.render('login');

});


router.get('/test', function(req, res, next) {

  session = req.session;
  session.email = "akheel"
  res.send('yup');

});


// router.post('/userdata', function(req, res, next) {

//   session = req.session;
//   session.email = req.body.email;
//   res.redirect('/');

// });


router.get('/logout', function(req, res, next) {

  session = req.session;
  session.email = null;
  res.redirect('/');

});



router.get('/userlist', function(req, res, next) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            userlist : docs
        });
    });
});







router.post('/userdata', function(req, res) {


    session = req.session;
    session.email = req.body.email;


    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userEmail = req.body.email;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            console.log('*************************Success*************************');
            res.redirect("/");
        }
    });
});






module.exports = router;
