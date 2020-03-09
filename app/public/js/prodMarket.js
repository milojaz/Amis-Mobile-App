// INITALIZING FARMERS DATA TABLE / COLLECTION REFERENCE
var connectedRef = firebase.database().ref(".info/connected"); // will holds the offline data
var prodMarketRef = firebase.database().ref('productMarketData');

// setting the database app persistence for offline cache storage
// FirebaseDatabase.service.setPersistenceEnabled(true);

// var ref: DatabaseReference = FirebaseDatabase.service.getReference("scores");
// ref.keepSynced(true);

// //This will work
// root.child("event_list").keepSynced(true);
// root.child("user_events").child(uid).keepSynced(true);

var offlineData = [];

// this event listener is listening for a form submit
document.getElementById('productMarketForm').addEventListener('submit', submitMarketForm);

// submitFarmersForm function
function submitMarketForm(e) {

    //preventing the form from submit automatically
    e.preventDefault();

    // getting the values
    var prodMktLocality = getInputValue('mktLocality');
    // var prodMktChiefdom = getInputValue('mktChiefdom');
    var prodMktDistrict = getInputValue('mktDistrict');
    // var prodMktRegion = getInputValue('mktRegion');
    var marketPlace = getInputValue('marketPlace');
    var marketType = getInputValue('marketType');
    var prodMktEnumerator = getInputValue('mktEnumerator');
    var prodMktDate = getInputValue('mktDate');
    var mktProductCategory = getInputValue('mktProductCategory');
    var prodName = getInputValue('mktProductName');
    var prodMktWHS_Unit = getInputValue('WHS_Unit');
    var prodMktWHS_Weight = getInputValue('WHS_Weight');
    var prodMktWHS_Price = parseInt(getInputValue('WHS_Price'));
    var prodMktRET_Unit = getInputValue('RET_Unit');
    var prodMktRET_Weight = getInputValue('RET_Weight');
    var prodMktRET_Price = parseInt(getInputValue('RET_Price'));
    var prodMktFG_Unit = getInputValue('FG_Unit');
    var prodMktFG_Weight = getInputValue('FG_Weight');
    var prodMktFG_Price = parseInt(getInputValue('FG_Price'));

    console.log(`locality: ${prodMktLocality}`)
    // console.log(`chiefdom: ${prodMktChiefdom}`)
    console.log(`district: ${prodMktDistrict}`)
    console.log(`market name: ${marketPlace}`)
    console.log(`market type: ${marketType}`)
    console.log(`produdct: ${prodName}`)
    

    // verify 
    // connectedRef.on("value", function(snap) {
    //     if (snap.val() === true) {

    //         console.log("connected");
    //         //calling the send and save data
    //         saveMarketData(prodMktLocality, prodMktChiefdom, prodMktDistrict, prodMktRegion, marketPlace, marketType, prodMktEnumerator, 
    //             prodMktDate, mktProductCategory, prodName, prodMktWHS_Unit, prodMktWHS_Weight, prodMktWHS_Price,
    //             prodMktRET_Unit, prodMktRET_Weight, prodMktRET_Price, prodMktFG_Unit, prodMktFG_Weight, prodMktFG_Price);

    //         offlineData.length = 0; // reseting the array
    //     } else {
    //         console.log("not connected");

    //         offlineData += saveMarketData(prodMktLocality, prodMktChiefdom, prodMktDistrict, prodMktRegion, marketPlace, marketType, prodMktEnumerator, 
    //             prodMktDate, mktProductCategory, prodName, prodMktWHS_Unit, prodMktWHS_Weight, prodMktWHS_Price,
    //             prodMktRET_Unit, prodMktRET_Weight, prodMktRET_Price, prodMktFG_Unit, prodMktFG_Weight, prodMktFG_Price);

    //         console.log("data saved in the cache");
    //     }
    // });

    // making a new market post  request to the server 
    // $('#btn-new-mktData').click(e => {
    //     e.preventDefault();

        // // getting the values
        // var prodMktLocality = getInptValue('mktLocality');
        // var prodMktChiefdom = getInptValue('mktChiefdom');
        // var prodMktDistrict = getInptValue('mktDistrict');
        // var prodMktRegion = getInptValue('mktRegion');
        // var marketPlace = getInptValue('marketPlace');
        // var prodMktEnumerator = getInptValue('mktEnumerator');
        // var mktProductCategory = getInptValue('mktProductCategory');
        // var prodName = getInptValue('mktProductName');
        // var prodMktWHS_Unit = getInptValue('WHS_Unit');
        // var prodMktWHS_Weight = parseInt(getInptValue('WHS_Weight'));
        // var prodMktWHS_Price = parseInt(getInptValue('WHS_Price'));
        // var prodMktRET_Unit = getInptValue('RET_Unit');
        // var prodMktRET_Weight = parseInt(getInptValue('RET_Weight'));
        // var prodMktRET_Price = parseInt(getInptValue('RET_Price'));
        // var prodMktFG_Unit = getInptValue('FG_Unit');
        // var prodMktFG_Weight = parseInt(getInptValue('FG_Weight'));
        // var prodMktFG_Price = parseInt(getInptValue('FG_Price'));

        // ajax request to make a new product
        // $.ajax({
        //     type: 'POST',
        //     url: '/inputMarketData',
        //     data: {
        //         mktLocality: prodMktLocality,
        //         mktChiefdom: prodMktChiefdom,
        //         mktDistrict: prodMktDistrict,
        //         mktRegion: prodMktRegion,
        //         marketPlace: marketPlace,
        //         mktEnumerator: prodMktEnumerator,
        //         mktProductName: prodName,
        //         mktProductCategory: mktProductCategory,
        //         WHS_Unit: prodMktWHS_Unit,
        //         WHS_Weight: prodMktWHS_Weight,
        //         WHS_Price: prodMktWHS_Price,
        //         RET_Unit: prodMktRET_Unit,
        //         RET_Weight: prodMktRET_Weight,
        //         RET_Price: prodMktRET_Price,
        //         FG_Unit: prodMktFG_Unit,
        //         FG_Weight: prodMktFG_Weight,
        //         FG_Price: prodMktFG_Price
        //     },
        //     success: function(response) {

        //     }
        // });
    // });


    // show submitAlert
    document.querySelector('.submitAlert').style.display = 'block';

    // hide submitAlert after 3 seconds
    setTimeout(function() {
        document.querySelector('.submitAlert').style.display = 'none';
    }, 10000);

    // clear form
    document.getElementById('productMarketForm').reset();
}

// function to get form inputs
function getInputValue(id) {
    return document.getElementById(id).value;
}

// SEND AND SAVE MESSAGE TO FIREBASE FUNCTION
function saveMarketData(locality, chiefdom, district, region, market_name, marketType, enumerator, date, productCategory, product, WHS_Unit, WHS_Weight, WHS_Price, RET_Unit, RET_Weight, RET_Price, FG_Unit, FG_Weight, FG_Price) {

    var newProdMarketRef = prodMarketRef.push();

    newProdMarketRef.set({
        locality: locality,
        chiefdom: chiefdom,
        district: district,
        region: region,
        market_name: market_name,
        marketType: marketType,
        enumerator: enumerator,
        date: date,
        productCategory: productCategory,
        product: product,
        wholesale_unit: WHS_Unit,
        wholesale_weight: WHS_Weight,
        wholesale_price: WHS_Price,
        retail_unit: RET_Unit,
        retail_weight: RET_Weight,
        retail_price: RET_Price,
        farmgate_unit: FG_Unit,
        farmgate_weight: FG_Weight,
        farmgate_price: FG_Price
    });
}