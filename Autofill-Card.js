// ==UserScript==
// @name        Autofill Americanet
// @namespace   com.schrauger
// @description Autofills americanet payment
// @include     https://easypayr.brighthouse.com/res/WSC/PROCESS_SELECT_NEW_MOP
// @version     1
// @grant       none
// ==/UserScript==
$(function(){
  $('input[name$="oneTimePayCurrentBalance"]').click()
  document.getElementById("amt_c").onclick()
  $('input[name$="creditCardName"]').val('First Last')
  $('[name$="selectedPaymentMethod"]').val('170') // 170 - visa. 180 - mastercard.
  $('input[name$="creditCardNumber"]').val('1234123412341234')
  $('[name$="expiryMonth"]').val('1') // 1 - january. 2 - february. etc. ID of 'select' element, not 0-padded.
  $('[name$="expiryYear"]').val('2000') // standard 4 digits. ID of 'select' element.
  $('input[name$="amountPayable"]').val('1.0') // set to one dollar, 0 (10-cents).
  $('input[name$="amountPayable"]').focus()
  $('input[name$="amountPayable"]')[0].setSelectionRange(3,3)
})
