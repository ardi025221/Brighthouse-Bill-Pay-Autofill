// ==UserScript==
// @name        Autofill Credit Card
// @namespace   com.schrauger
// @author Stephen Schrauger
// @description Autofills Credit Card Payment
// @homepage https://github.com/schrauger/Brighthouse-Bill-Pay-Autofill
// @include     https://pay.brighthouse.com/billpay/app/billpay
// @version     2.0-pre-alpha
// @grant       none
// @downloadURL https://raw.githubusercontent.com/schrauger/Brighthouse-Bill-Pay-Autofill/master/Autofill-Card.user.js
// @updateURL   https://raw.githubusercontent.com/schrauger/Brighthouse-Bill-Pay-Autofill/master/Autofill-Card.user.js
// ==/UserScript==
/*jslint browser: true*/
/*global jQuery*/

// How to use:
// Fill in the credit card information. If you have multiple cards,
// create multiple objects.
// Set the current credit card in use inside the code. This is located below the credit
// card definitions but before the main function.
// When you have finished making the needed transcations, edit this script and
// set the next card as needed.

/*
// no longer needed. the 2017 version auto detects type (finally)
var cc_VISA = '170';
var cc_MASTERCARD = '180';
var cc_AMEX = '190';
var cc_DISCOVER = '200';
*/

/*
card_example = new Object();
card_example.name = 'First Last'; // name on card
card_example.number = '1234123412341234'; // number
//card_example.payment_method = cc_VISA; // credit card type (visa, mastercard, american express, or discover)
card_example.month = '1'; // expiration month (do not pad with 0s)
card_example.year = '2000'; // expiration year (full 4 digits)
card_example.type = 'partial' // Set to 'partial' if you want to auto select the partial payment. Set to 'remainder' to auto select the remaining balance
*/

card_a = {};
card_a.name = 'First Last';
card_a.number = '1234123412341234';
//card_a.payment_method = cc_VISA;
card_a.month = '1';
card_a.year = '2003';
card_a.type = 'partial';

card_b = {};
card_b.name = 'First Last';
card_b.number = '2345234523452345';
//card_b.payment_method = cc_MASTERCARD;
card_b.month = '2';
card_b.year = '2002';
card_b.type = 'partial';

card_c = {};
card_c.name = 'First Last';
card_c.number = '3456345634563456';
//card_c.payment_method = cc_DISCOVER;
card_c.month = '3';
card_c.year = '2003';
card_c.type = 'remainder';

// Select your card here. Comment out all other cards.
credit_card = card_a; // requires 10 transactions
//credit_card = card_b; // requires 12 transactions
//credit_card = card_c; // pay remainder of bill (this card has rewards)

$(function(){
  // @todo use mutator or other event to check selected state when changed, since it's all on the same page and uses js to change states.
  
  if ($('.selectedState').hasClass('stepOne')){
    // Step one. Select Other Amount and prep field input'
    $('#other').click();
    //document.getElementById("other").onclick();
    $('#otherAmtInput').val('$1.0'); // set to one dollar, 0 (10-cents).
    $('#otherAmtInput').focus();
    $('#otherAmtInput')[0].setSelectionRange(4,4); // set the focus to payment amount and put the cursor at the end
    //@todo fix focus and selector.
    //@todo allow {enter} to submit form
  }

  if ($('.selectedState').hasClass('stepTwo')){
    // Step two. Add new payment manually.
    $('div.addPaymentBillPay a').click();
    $('[id="vm.form_nameOnCard_nameOnCard_1"').val(credit_card.name).trigger("change");
    $('[id="vm.form_creditCard_ccNumber_2"').val(credit_card.number.replace(/(.{4})/g,"$1 ").trim()).trigger("change");
    $('[id="inputCCExpMonth"').val(credit_card.month).trigger("change"); // 1 - january. 2 - february. etc.
    if (credit_card.year.length == 4){
        // just use two digits
        credit_card.year = credit_card.year.substring(2);
    }
    $('[id="inputCCExpYear"').val(credit_card.year).trigger("change");//.trigger("keydown").trigger("keypress"); // 2 digits.

    // Payment type. Auto select 'credit card/debit card'
    $('.newPayMethBtn:contains("add card")').prop("disabled","false");
    $('.newPayMethBtn:contains("add card")').click();
  }

  if ($('selectedState').hasClass('stepThree')){
    // @todo focus on the submit button. require manual user input to submit, so they can verify details.

});
