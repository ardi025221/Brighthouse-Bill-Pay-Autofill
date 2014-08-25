// ==UserScript==
// @name        Autofill Credit Card
// @namespace   com.schrauger
// @description Autofills Credit Card Payment
// @include     https://easypayr.brighthouse.com/res/WSC/PROCESS_SELECT_NEW_MOP
// @version     1
// @grant       none
// ==/UserScript==

var cc_VISA = '170';
var cc_MASTERCARD = '180';
var cc_AMEX = '190';
var cc_DISCOVER = '200';

credit_card = new Object();
credit_card.name = 'Stephen Schrauger';
credit_card.number = '1234123412341234';
credit_card.payment_method = cc_VISA;
credit_card.month = '1';
credit_card.year = '2000';

$(function(){
  $('input[name$="oneTimePayCurrentBalance"]').click();
  document.getElementById("amt_c").onclick();
  $('input[name$="creditCardName"]').val(credit_card.name);
  $('[name$="selectedPaymentMethod"]').val(credit_card.payment_method);
  $('input[name$="creditCardNumber"]').val(credit_card.number);
  $('[name$="expiryMonth"]').val(credit_card.month); // 1 - january. 2 - february. etc. ID of 'select' element, not 0-padded.
  $('[name$="expiryYear"]').val(credit_card.year); // standard 4 digits. ID of 'select' element.
  $('input[name$="amountPayable"]').val('1.0'); // set to one dollar, 0 (10-cents).
  $('input[name$="amountPayable"]').focus();
  $('input[name$="amountPayable"]')[0].setSelectionRange(3,3); // set the focus to payment amount and put the cursor at the end
})
