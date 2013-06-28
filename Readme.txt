/**********************************************************************
 * README
 *
 * jquery.mortgagecalc.js - A simple jQuery mortgage Calculator
 *
**********************************************************************/
jquery.mortgagecalc.js is a quick and dirty javascript based mortgage
calculator. It uses the following formula to calculate interest:

PAYMENT = PRICE x INTEREST / (1 – (1 + INTEREST)^–TERM)

PAYMENT = Montly Payment
PRICE = Amount Finance
INTEREST = Interest Rate
TERM = Number of Payments

/**********************************************************************
 *  Usage
**********************************************************************/
All code is inserted into a container element. 

<script>
$(document).ready(function(){
  var params = {
    price: 300000,
    down_payment: 30000
  }
  $('#calc').mortgagecalc(params);
});
</script>

<div id="calc"></div>

/**********************************************************************
 * Parameters 
**********************************************************************/
The script accepts the following parameters:

price (integer): Total amount being financed. Defaults to 0.
down_payment (integer): Down payment. Defaults to 0.
loan_term (integer): Loan term amount in years. Defaults to 30.
interest_rate (float): Interest rate. Defaults to 4.25.
add_css (boolean): Includes basic form CSS. Defaults to true.

Example using all params:
<script>
$(document).ready(function(){
  var params = {
    price: 300000,
    down_payment: 30000,
    loan_term: 15,
    interest_rate: 3.25,
  }
  $('#calc').mortgagecalc(params);
});
</script>

<div id="calc"></div>
