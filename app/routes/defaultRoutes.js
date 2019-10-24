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
    .get(isUserAuthenticated, defaultController.marketGet)
    .post(isUserAuthenticated, defaultController.marketDataPost);


router.route('/inputTradeFlowData')
    .get(isUserAuthenticated, defaultController.tradeFlowGet)
    .post(isUserAuthenticated, defaultController.tradeFlowPost);

router.route('/inputExportFlow')
    .get(isUserAuthenticated, defaultController.exportFlowGet)
    .post(isUserAuthenticated, defaultController.exportFlowPost);

router.route('/inputStockLevel')
    .get(isUserAuthenticated, defaultController.stockGet)
    .post(isUserAuthenticated, defaultController.stockDataPost);

router.route('/about')
    .get(isUserAuthenticated, defaultController.aboutGet);

module.exports = router;