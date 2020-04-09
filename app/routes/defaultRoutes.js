// modules
var express = require('express');
var router = express.Router();
var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// configuration file
const {
    isUserAuthenticated
} = require('../config/customFunction');


var defaultController = require('../controllers/defaultController');

// index route 
router.route('/')
    .get(defaultController.index)
    .post( // authenticating the user
        passport.authenticate('local', {
            successRedirect: '/inputMarketData',
            failureRedirect: '/',
            failureFlash: true
        }));

// logout route
router.route('/logout')
    .get(defaultController.logout);

router.route('/inputMarketData')
    .get(defaultController.marketGet)
    .post(defaultController.marketDataPost);


//  isUserAuthenticated was remove from the below routes
router.route('/inputTradeFlowData')
    .get(defaultController.tradeFlowGet)
    .post(defaultController.tradeFlowPost);

router.route('/inputExportFlow')
    .get(defaultController.exportFlowGet)
    .post(defaultController.exportFlowPost);

router.route('/inputStockLevel')
    .get(defaultController.stockGet)
    .post(defaultController.stockDataPost);

router.route('/about')
    .get(defaultController.aboutGet);

module.exports = router;