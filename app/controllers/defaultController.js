var ExportFlowData = require('../models/exportFlowModel');
var tradeFlowModel = require('../models/tradeFlowModel');
var MarketData = require('../models/marketDataModel');
var stockFlowModel = require('../models/stockFlowModel');

// export
module.exports = {
    // login page get controller
    index: (req, res) => {
        res.render('index', {
            pageTitle: "index",
            pageID: "index"
        });
    },

    // login post controller
    indexPost: (req, res) => {
        res.send('login successful');

    },

    // logout get controller
    logout: (req, res) => {

        req.logout();
        req.flash('success_msg', 'You have logged out');
        res.redirect('/'); //redirecting to the login page
    },

    marketGet: (req, res) => {

        // rendering the page
        res.render('marketView', {
            pageTitle: "inputMarketData",
            pageID: "inputMarketData",
            enumerator: req.user
        });
    },

    marketDataPost: (req, res) => {
        const {
            mktLocality,
            mktChiefdom,
            mktDistrict,
            mktRegion,
            marketPlace,
            marketType,
            mktEnumerator,
            mktProductCategory,
            mktProductName,
            mktDate,
            WHS_Unit,
            WHS_Weight,
            WHS_Price,
            RET_Unit,
            RET_Weight,
            RET_Price,
            FG_Unit,
            FG_Weight,
            FG_Price,
        } = req.body;

        var newMarketDataFlow = new MarketData({
            mktLocality: mktLocality,
            mktChiefdom: mktChiefdom,
            mktDistrict: mktDistrict,
            mktRegion: mktRegion,
            marketPlace: marketPlace,
            marketType: marketType,
            mktEnumerator: mktEnumerator,
            mktProductCategory: mktProductCategory,
            mktProductName: mktProductName,
            date: mktDate,
            WHS_Unit: WHS_Unit,
            WHS_Weight: parseInt(WHS_Weight),
            WHS_Price: parseInt(WHS_Price),
            RET_Unit: RET_Unit,
            RET_Weight: parseInt(RET_Weight),
            RET_Price: parseInt(RET_Price),
            FG_Unit: FG_Unit,
            FG_Weight: parseInt(FG_Weight),
            FG_Price: parseInt(FG_Price),

        });
        console.log(newMarketDataFlow);
        // saving the data
        newMarketDataFlow.save()
            .then(data => {
                res.render('marketView', {
                    pageTitle: "inputMarketData",
                    pageID: "inputMarketData",
                    enumerator: req.user || data
                });
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    },

    tradeFlowGet: (req, res) => {

        // rendering the page
        res.render('tradeFlowView', {
            pageTitle: "inputTradeFlowData",
            pageID: "inputTradeFlowData",
            enumerator: req.user
        });
    },

    tradeFlowPost: (req, res) => {
        const {
            product,
            tonage,
            value,
            enumerator,
            locality_from,
            chiefdom_from,
            district_from,
            locality_to,
            chiefdom_to,
            district_to,
            date
        } = req.body;

        var newTradeFlow = new tradeFlowModel({
            product: product,
            tonage: tonage,
            value: value,
            enumerator: enumerator,
            locality_from: locality_from,
            chiefdom_from: chiefdom_from,
            district_from: district_from,
            locality_to: locality_to,
            chiefdom_to: chiefdom_to,
            district_to: district_to,
            date: date
        });
        // saving the data
        console.log(newTradeFlow);
        newTradeFlow.save()
            .then(data => {
                res.render('tradeFlowView', {
                    pageTitle: "tradeFlow",
                    pageID: "tradeFlow",
                    enumerator: req.user
                });
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    },

    exportFlowGet: (req, res) => {

        // rendering the page
        res.render('exportFlowView', {
            pageTitle: "exportFlow",
            pageID: "exportFlow",
            enumerator: req.user
        });
        console.log(req.body)
    },

    exportFlowPost: (req, res) => {
        // fetch all the fiels
        const {
            name,
            email,
            address,
            phone,
            products,
            weight,
            tonage,
            value,
            district,
            region,
            districtFrom,
            countryTO,
            date
        } = req.body;
        console.log(req.body)
            // instatiating a new enumerator
        var newExportFlow = new ExportFlowData({
            name: name,
            email: email,
            address: address,
            phone: phone,
            products: products,
            weight: weight,
            tonage: tonage,
            value: value,
            district: district,
            region: region,
            districtFrom: districtFrom,
            countryTO: countryTO,
            date: date
        });
        console.log(newExportFlow);

        // saving the data
        newExportFlow.save()
            .then(data => {
                res.render('exportFlowView', {
                    pageTitle: "exportFlow",
                    pageID: "exportFlow",
                    enumerator: req.user || data
                });

            })
            .catch(err => {
                console.log(err);
            })


    },

    aboutGet: (req, res) => {
        // rendering the page
        res.render('aboutView', {
            pageTitle: "aboutPage",
            pageID: "aboutPage",
            enumerator: req.user
        });
    },
    stockGet: (req, res) => {

        // rendering the page
        res.render('stockView', {
            pageTitle: "stockLevelData",
            pageID: "stockLevelData",
            enumerator: req.user
        });
    },

    stockDataPost: (req, res) => {
        const {
            ttmDistrict,
            marketPlaceArr,
            ttmMarket,
            msuProductCategory,
            productsArr,
            market_type,
            ttmPrice,
            quantityStore,
            quantityUnit,
            quantitySold,
            stockLevel,
            stockDestination,
            grandTotal,
            rent,
            transportCost,
            electricity,
            securityOwn,
            securityMarketOwn,
            fumigation,
            chemicalTreatment,
            averageCost,
        } = req.body;

        var newStockDataFlow = new stockFlowModel({
            ttmDistrict: ttmDistrict,
            marketPlaceArr: marketPlaceArr,
            ttmMarket: ttmMarket,
            msuProductCategory: msuProductCategory,
            productsArr: productsArr,
            market_type: market_type,
            ttmPrice: parseInt(ttmPrice),
            quantityStore: parseInt(quantityStore),
            quantityUnit: quantityUnit,
            quantitySold: parseInt(quantitySold),
            stockLevel: parseInt(stockLevel),
            stockDestination: parseInt(stockDestination),
            grandTotal: parseInt(grandTotal),
            rent: parseInt(rent),
            transportCost: parseInt(transportCost),
            electricity: parseInt(electricity),
            securityOwn: parseInt(securityOwn),
            securityMarketOwn: parseInt(securityMarketOwn),
            fumigation: parseInt(fumigation),
            chemicalTreatment: parseInt(chemicalTreatment),
            averageCost: parseInt(averageCost),

        });
        console.log(newStockDataFlow);
        // saving the data
        newStockDataFlow.save()
            .then(data => {
                res.render('stockView', {
                    pageTitle: "inputMarketData",
                    pageID: "inputMarketData",
                    enumerator: req.user || data
                });

            })
            .catch(err => {
                console.log(err);
            });
    }

};