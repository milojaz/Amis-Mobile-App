// INITALIZING FARMERS DATA TABLE / COLLECTION REFERENCE
var connectedRef = firebase.database().ref(".info/connected"); // will holds the offline data
var prodTradeFlowRef = firebase.database().ref('productTradeFlowData');

// setting the database app persistence for offline cache storage
// FirebaseDatabase.service.setPersistenceEnabled(true);

// this event listener is listening for a form submit
document.getElementById('productTradeFlowForm').addEventListener('submit', submitProductTradeForm);

// submitFarmersForm function
function submitProductTradeForm(e) {

    //preventing the form from submit automatically
    e.preventDefault();

    // getting the values
    var tradeFlowProductName = getInptValue('product');
    var tradeFlowTonage = getInptValue('tonage');
    var tradeFlowValue = getInptValue('value');
    var tradeFlowEnumerator = getInptValue('enumerator');
    var tradeFlowDate = getInptValue('date');
    var tradeFlowLocalityFROM = getInptValue('locality_from');
    var tradeFlowChiefdomFROM = getInptValue('chiefdom_from');
    var tradeFlowDistrictsFROM = getInptValue('district_from');
    var tradeFlowLocalityTO = getInptValue('locality_to');
    var tradeFlowChiefdomTO = getInptValue('chiefdom_to');
    var tradeFlowDistrictsTO = getInptValue('district_to');


    connectedRef.on("value", function(snap) {
        if (snap.val() === true) {
            console.log("connected");
            //calling the send and save data
            saveProdTradeData(tradeFlowProductName, tradeFlowTonage, tradeFlowValue, tradeFlowEnumerator, tradeFlowDate,
                tradeFlowLocalityFROM, tradeFlowChiefdomFROM, tradeFlowDistrictsFROM,
                tradeFlowLocalityTO, tradeFlowChiefdomTO, tradeFlowDistrictsTO);
        } else {
            console.log("not connected");

            offlineData += saveProdTradeData(tradeFlowProductName, tradeFlowTonage, tradeFlowValue, tradeFlowEnumerator, tradeFlowDate,
                tradeFlowLocalityFROM, tradeFlowChiefdomFROM, tradeFlowDistrictsFROM,
                tradeFlowLocalityTO, tradeFlowChiefdomTO, tradeFlowDistrictsTO);

            console.log("data saved in the cache");

        }
    });

    // show submitAlert
    document.querySelector('.submitAlert').style.display = 'block';

    // hide submitAlert after 3 seconds
    setTimeout(function() {
        document.querySelector('.submitAlert').style.display = 'none';
    }, 10000);
    

    // show errorAlert
    // document.querySelector('.errorAlert').style.display = 'block';

    // // hide errorAlert after 3 seconds
    // setTimeout(function() {
    //     document.querySelector('.errorAlert').style.display = 'none';
    // }, 10000);

    // clear form
    document.getElementById('productTradeFlowForm').reset();
}

// function to get form inputs
function getInptValue(id) {
    return document.getElementById(id).value;
}

// SEND AND SAVE DATA TO FIREBASE FUNCTION
function saveProdTradeData(tradeFlowProductName, tradeFlowTonage, tradeFlowValue, tradeFlowEnumerator, tradeFlowDate,
    tradeFlowLocalityFROM, tradeFlowChiefdomFROM, tradeFlowDistrictsFROM,
    tradeFlowLocalityTO, tradeFlowChiefdomTO, tradeFlowDistrictsTO) {

    var newProdTradeFlowRef = prodTradeFlowRef.push();

    newProdTradeFlowRef.set({
        product: tradeFlowProductName,
        tonage: tradeFlowTonage,
        value: tradeFlowValue,
        enumerator: tradeFlowEnumerator,
        date: tradeFlowDate,
        locality_from: tradeFlowLocalityFROM,
        chiefdom_from: tradeFlowChiefdomFROM,
        district_from: tradeFlowDistrictsFROM,
        locality_to: tradeFlowLocalityTO,
        chiefdom_to: tradeFlowChiefdomTO,
        district_to: tradeFlowDistrictsTO,
    });
}