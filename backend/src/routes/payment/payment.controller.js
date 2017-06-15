'use strict'

var exports = module.exports;
var BASIC_PLAN_ID = 'emissary_basic';

var Company = require('../../models/Company');

var stripe = require("stripe")(
  "sk_test_dqzYJJ6xWGgg6U1hgQr3hNye"
); // TODO: do i need to do this for every js file that uses stripe?


/**
* Creates a subscription plan for a company
* @param req - a request object that contains the company's stripe token and email
* @param res - a response object that either returns an error message or creates the subscription
*/
exports.createSubscription = function(req, res){
	// create customer, TODO: could there be an existing stripe customer ID?
	stripe.customers.create({ // calls stripe customer create
		description: 'Customer for '+req.body.stripeEmail,
		plan: BASIC_PLAN_ID, // TODO: move this string to a global constant
		source: req.body.stripeToken
	}, function (err, customer){ // then passes err and customer to this callback for handling
		if (err) {
			return res.status(400).send({ error: "Could not create customer" });
		}
		// TODO: set company's subscribed to true and 
		// save customerID to account with a call to api/companies/update?
		// use localstorage to retrieve id of which company to update?
	});
};

/**
* Gets the company's subscription plan
* @param req - a request object that contains the company's id
* @param res - a response object that either returns an error message or returns the company's subscription if it have one
*
*/
exports.getSubscription = function(req, res){
	Company.findOne({_id: req.params.id}, function (err, result){
		var stripeCustomerID = result.stripeCustomerID;
		stripe.customers.listSubscriptions(stripeCustomerID,
			function(err, subscriptions){
				var subList = subscriptions.data;
				var index = basicPlanIndex(subList);
				if (index == -1){
					return res.status(200).json({error: "Could not find"});
				}
				else {
					return res.status(200).json(subList[index]);
				}
			});
	});

}

/**
* Checks whether a company is subscriped to a basic plan by going through an array and checking if the id matches
*/
function basicPlanIndex(arr){
	var arrLength = arr.length;
	for(var i = 0; i < arrLength; i++){
		if (arr[i].plan.id==BASIC_PLAN_ID){
			return i;
		}
	}
	return -1;
}