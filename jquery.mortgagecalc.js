/**
 * A Simple jQuery based mortgage calculator.
 *
*/


var MortgageCalc = {
	_create: function() {
    var self = this;
    var html = self._element_factory();
    $(self.element).html(html);
    $(self.element + ':button').click($.proxy(self._event_calculate,self))
	},
  // Hook to create form elements
  _element_factory: function() {
    var output = '';
    var self = this;
    var styles = '';
    //Add Styles First
    if(self.options.add_css) {
      styles += '<style type="text/css">';
      styles += '#mortgagecalc_wrapper div {clear: both; padding-top: 5px;}';
      styles += '#mortgagecalc_wrapper label {float: left; width: 150px; text-align: right;margin-right: 5px}';
      styles += '#mortgagecalc_wrapper .button_wrapper {margin-left: 155px}';
      styles += '</style>';
      $('head').append(styles);
    }
    //Add Form Elements
    output += '<div id="mortgagecalc_wrapper">';
    output += '<div>';
    output += '<label for="price">Price:</label>';
    output += '<input type="text" name="price" value="' + self.options.price + '">';
    output += '</div>';
    output += '<div>';
    output += '<label for="down_payment">Down Payment:</label>';
    output += '<input type="text" name="down_payment" value="' + self.options.down_payment + '">';
    output += '<span id="dpmt_wrapper">(<span id="down_payment_rate">' + self._get_down_payment_rate() + '</span>%)</span>';
    output += '</div>';
    output += '<div>';
    output += '<label for="interest_rate">Interest Rate:</label>';
    output += '<input type="text" name="interest_rate" value="' + self.options.interest_rate + '">';
    output += '</div>'; 
    output += '<div>';
    output += '<label for="loan_term">Term:</label>';
    output += '<input type="text" name="loan_term" value="' + self.options.loan_term+ '">';
    output += '</div>'; 
    output += '<div>';
    output += '<label for="monthly_payment">Monthly Payment:</label>'; 
    output += '$<span id="monthly_payment">' + self._get_monthly_payment() + '</span>'; 
    output += '</div>';
    output += '<div class="button_wrapper">';
    output += '<button type="button" name="calculate" value="Calculate">Calculate</button>'; 
    output += '</div>';
    output += '</div>';
    return output;
  },
  _get_monthly_payment: function() {
    var PR = this._get_val('price') - this._get_val('down_payment');
    var IN = (this._get_val('interest_rate') * 0.01) / 12;
    var PE = this._get_val('loan_term') * 12;
    var payment = (PR * IN) / (1 - Math.pow(1 + IN, -PE))
    payment = this._round_number(payment,2); 
    return payment;
  },
  _get_val: function(val) {
    var _v = parseFloat($(this.element).find('input[name=' + val + ']').val());
    if(!isNaN(_v)) {
      return _v;
    }
    if(!isNaN(parseFloat(this.options[val]))) {
      return parseFloat(this.options[val]);
    }
    return 0;
  },
  _get_down_payment_rate: function() {
    var price = this._get_val('price');
    var dpmt = this._get_val('down_payment');
    return this._round_number((dpmt/price) * 100,2);
  },
  _round_number: function(value,decimal_len) {
    return Math.round(value * Math.pow(10,decimal_len))/Math.pow(10,decimal_len);
  },
  _event_calculate: function() {
    $(this.element).find('#down_payment_rate').html(this._get_down_payment_rate());
    $(this.element).find('#monthly_payment').html(this._get_monthly_payment()); 
  },
 	options: {
    price: 0,
    down_payment: 0,
    loan_term: 30,
    interest_rate: 4.25,
    add_css: true
	}
};
$.widget ('ui.mortgagecalc', MortgageCalc);