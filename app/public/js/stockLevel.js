// INITALIZING FARMERS DATA TABLE / COLLECTION REFERENCE
var connectedRef = firebase.database().ref(".info/connected"); // will holds the offline data
var stockLevelRef = firebase.database().ref('stockLevelData');

var offlineData = [];

// this event listener is listening for a form submit
document.getElementById('stockLevelForm').addEventListener('submit', submitstockLevelForm);

// submitFarmersForm function
function submitstockLevelForm(e) {

    //preventing the form from submit automatically
    e.preventDefault();

    // arrays definition
    var marketPlaceArr = [];
    var productsArr = [];

    // temp arrays
    var mktPlaceTemp = [];
    var productsTemp = [];

    // get the market place
    [...document.querySelectorAll('select[name^="ttmmarketPlace"]')].forEach(sel => marketPlaceArr.push(sel.value) );

    // get the market product
    [...document.querySelectorAll('select[name^="msuProductName"]')].forEach(sel => productsArr.push(sel.value) );

    
    // loop through the market place array
    for(let i of marketPlaceArr){
        i && mktPlaceTemp.push(i); // copy each non-empty value to the 'marketplaceArray' array

        marketPlaceArr = mktPlaceTemp; // assign the tempArray to the marketplaceArray
    }

    // loop through the products array
    for(let i of productsArr){
        i && productsTemp.push(i); // copy each non-empty value to the 'productsArray' array

        productsArr = productsTemp; // assign the tempArray to the productsArray
    }

    // getting the values
    var ttmDistrict = getInptValue('ttmDistrict');
    var Market_Place = marketPlaceArr[0]; // getInptValue('ttmmarketPlace');
    var ttmMarketLocality = getInptValue('ttmMarket');
    var msu_ProductCategory = getInptValue('msuProductCategory');
    var msu_ProductName = productsArr[0]; // getInptValue('msuProductName');
    var ttmMarketType = getInptValue('market_type');
    var ttmMarketPrice = parseInt(getInptValue('ttmPrice'));


    var quantity_Store = parseInt(getInptValue('quantityStore'));
    var quantity_Weight = getInptValue('quantityUnit');
    var quantity_Sold = parseInt(getInptValue('quantitySold'));
    var stock_Level = parseInt(getInptValue('stockLevel'));
    var Destination = getInptValue('stockDestination');

    var grandTotal = parseInt(getInptValue('grandTotal'));

    var Rent = parseInt(getInptValue('rent'));
    var transportCost = parseInt(getInptValue('transportCost'));
    var electricity = parseInt(getInptValue('electricity'));
    var securityOwn = parseInt(getInptValue('securityOwn'));
    var securityMarketOwn = parseInt(getInptValue('securityMarketOwn'));
    var fumigation = parseInt(getInptValue('fumigation'));
    var chemicalTreatment = parseInt(getInptValue('chemicalTreatment'));
    var averageCost = parseInt(getInptValue('averageCost'));

    // console.log(`distict ${ttmDistrict}`)
    // console.log(`market place: ${Market_Place}`)
    // console.log(`locality: ${ttmMarketLocality}`)
    // console.log(`product cat: ${msu_ProductCategory}`)
    // console.log(`product name: ${msu_ProductName}`)
    // console.log(`market type: ${ttmMarketType}`)
    // console.log(`market price: ${ttmMarketPrice}`)

    // console.log(`quantity_Store: ${quantity_Store}`)
    // console.log(`quantity_Weight: ${quantity_Weight}`)
    // console.log(`quantity_Sold: ${quantity_Sold}`)
    // console.log(`stock_Level: ${stock_Level}`)
    // console.log(`Destination: ${Destination}`)

    // console.log(`grandTotal: ${grandTotal}`)

    // console.log(`Rent: ${Rent}`)
    // console.log(`transportCost: ${transportCost}`)
    // console.log(`electricity: ${electricity}`)
    // console.log(`securityOwn: ${securityOwn}`)
    // console.log(`securityMarketOwn: ${securityMarketOwn}`)
    // console.log(`fumigation: ${fumigation}`)
    // console.log(`chemicalTreatment: ${chemicalTreatment}`)
    // console.log(`averageCost: ${averageCost}`)


    // verify 
    connectedRef.on("value", function (snap) {
        if (snap.val() === true) {

            console.log("connected");
            //calling the send and save data
            saveStockData(ttmDistrict, Market_Place, ttmMarketLocality, msu_ProductCategory, msu_ProductName, ttmMarketType,
                ttmMarketPrice, quantity_Weight, quantity_Store, quantity_Sold, stock_Level, Destination, grandTotal, Rent, transportCost, electricity, securityOwn, securityMarketOwn, fumigation, chemicalTreatment, averageCost);

            offlineData.length = 0; // reseting the array
        } else {
            console.log("not connected");

            offlineData += saveStockData(ttmDistrict, Market_Place, ttmMarketLocality, msu_ProductCategory, msu_ProductName, ttmMarketType,
                ttmMarketPrice, quantity_Weight, quantity_Store, quantity_Sold, stock_Level, Destination, grandTotal, Rent, transportCost, electricity, securityOwn, securityMarketOwn, fumigation, chemicalTreatment, averageCost);

            console.log("data saved in the cache");
        }
    });

    // show submitAlert
    document.querySelector('.submitAlert').style.display = 'block';

    // hide submitAlert after 3 seconds
    setTimeout(function() {
        document.querySelector('.submitAlert').style.display = 'none';
    }, 10000);

    // clear form
    document.getElementById('stockLevelForm').reset();
}

// function to get form inputs
function getInptValue(id) {

    return document.getElementById(id).value;
}

// SEND AND SAVE MESSAGE TO FIREBASE FUNCTION
function saveStockData(ttmDistrict, Market_Place, ttmMarketLocality, msu_ProductCategory, msu_ProductName, ttmMarketType,
    ttmMarketPrice, quantity_Store, quantity_Weight, quantity_Sold, stock_Level, Destination, grandTotal, Rent, transportCost, electricity, securityOwn, securityMarketOwn, fumigation, chemicalTreatment, averageCost) {
    var newstockLevelRef = stockLevelRef.push();

    newstockLevelRef.set({
        district: ttmDistrict,
        market_Place: Market_Place,
        marketLocality: ttmMarketLocality,
        productCategory: msu_ProductCategory,
        productName: msu_ProductName,
        marketType: ttmMarketType,
        marketPrice: ttmMarketPrice,
        quantityStore: quantity_Store,
        quantityUnit: quantity_Weight,
        quantitySold: quantity_Sold,
        stockLevel: stock_Level,
        destination: Destination,
        grandTotal: grandTotal,
        rent: Rent,
        transportCost: transportCost,
        electricity: electricity,
        securityOwn: securityOwn,
        securityMarketOwn: securityMarketOwn,
        fumigation: fumigation,
        chemicalTreatment: chemicalTreatment,
        averageCost: averageCost
    });
}