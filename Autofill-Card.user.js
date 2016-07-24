// ==UserScript==
// @name        Autofill Credit Card
// @namespace   com.schrauger
// @author Stephen Schrauger
// @description Autofills Credit Card Payment
// @homepage https://github.com/schrauger/mint.com-customize-default-categories
// @include     https://easypayr.brighthouse.com/res/WSC/*
// @version     1.2
// @grant       none
// @include https://*.mint.com/*
// @version 1.3.4
// @grant none
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

var cc_VISA = '170';
var cc_MASTERCARD = '180';
var cc_AMEX = '190';
var cc_DISCOVER = '200';

/*
card_example = new Object();
card_example.name = 'First Last'; // name on card
card_example.number = '1234123412341234'; // number
card_example.payment_method = cc_VISA; // credit card type (visa, mastercard, american express, or discover)
card_example.month = '1'; // expiration month (do not pad with 0s)
card_example.year = '2000'; // expiration year (full 4 digits)
card_example.type = 'partial' // Set to 'partial' if you want to auto select the partial payment. Set to 'remainder' to auto select the remaining balance
*/

card_a = new Object();
card_a.name = 'First Last';
card_a.number = '1234123412341234';
card_a.payment_method = cc_VISA;
card_a.month = '1';
card_a.year = '2003';
card_a.type = 'partial'

card_b = new Object();
card_b.name = 'First Last';
card_b.number = '2345234523452345';
card_b.payment_method = cc_MASTERCARD;
card_b.month = '2';
card_b.year = '2002';
card_b.type = 'partial'

card_c = new Object();
card_c.name = 'First Last';
card_c.number = '3456345634563456';
card_c.payment_method = cc_DISCOVER;
card_c.month = '3';
card_c.year = '2003';
card_c.type = 'remainder'


// Select your card here. Comment out all other cards.
credit_card = card_a // requires 10 transactions
//credit_card = card_b // requires 12 transactions
//credit_card = card_c // pay remainder of bill (this card has rewards)

$(function(){
  if (window.location.pathname == "/res/WSC/Payments"){
    // Initial window. Auto click 'one-time payment'
    jQuery('.twoButtons a.makeAOneTime')[0].click();
  }
  if (window.location.pathname == "/res/WSC/SELECT_NEW_MOP"){
    // Payment type. Auto select 'credit card/debit card'
    jQuery('[name="selectedPaymentClass"]').val('C').trigger('change');
  }
  
  if (window.location.pathname == "/res/WSC/PROCESS_SELECT_NEW_MOP"){
    // actual payment screen. fill all info, and wait for user
    // to fill in remaining information.
    if (credit_card.type == 'partial'){
      $('#amt_c').click();
      document.getElementById("amt_c").onclick();
      $('input[name$="amountPayable"]').val('1.0'); // set to one dollar, 0 (10-cents).
      $('input[name$="amountPayable"]').focus();
      $('input[name$="amountPayable"]')[0].setSelectionRange(3,3); // set the focus to payment amount and put the cursor at the end
    } else if (credit_card.type == 'remainder'){
      $('#amt_a').click();
      document.getElementById("amt_a").onclick();
      jQuery('#submit_btn').focus();
    }
    $('input[name$="creditCardName"]').val(credit_card.name);
    $('[name$="selectedPaymentMethod"]').val(credit_card.payment_method);
    $('input[name$="creditCardNumber"]').val(credit_card.number);
    $('[name$="expiryMonth"]').val(credit_card.month); // 1 - january. 2 - february. etc. ID of 'select' element, not 0-padded.
    $('[name$="expiryYear"]').val(credit_card.year); // standard 4 digits. ID of 'select' element.
  }
  if (window.location.pathname == "/res/WSC/PREVIEW_ONE_TIME_CC"){
    // Highlight the submit button. Let the user look over the
    // final info and be able to press enter.
    jQuery('#submit_btn').focus();
  }
  if (window.location.pathname == "/res/WSC/PROCESS_PAY_ONLINE_CC"){
    // Payment complete. Highlight the 'bill pay' link if the user
    // wants to make another payment.
    jQuery('#navItem2').focus();
  }
})
