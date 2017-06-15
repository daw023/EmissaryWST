'use strict';

/*This module is meant to house the functions
 * used by the authorization (auth) API. The
 * actual API is set up in index.js

 Functions:
 authSignup()
 authLogin()
 authResetCredentials()
 */


/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var Appointment = require('../../models/Appointment');
var Text = require('../../notification/text');

/****** Company TEMPLATE ROUTES ******/
module.exports.template = {};

/**
* Creates a new appointment for a visitor
* @param {Object} req - a request object that contains a visitor's information which includes
*						a visitor's first name, last name, phone number, appointment date, company visiting id, and provider name
* @param {Object} res - a response object that either returns an error message or saves the visitor's appointment
*/
module.exports.template.create = function(req, res) {
    var appointment = new Appointment();
    var param = req.body;

    //require provided info
    appointment.first_name = param.first_name;
    appointment.last_name = param.last_name;
    appointment.phone_number = param.phone_number;
    appointment.date = param.date;
    appointment.company_id = param.company_id;
    appointment.provider_name = param.provider_name;
    console.log(appointment.date);

    Appointment.find(
        {
            company_id:param.company_id,
            date:param.date
        }, function(err, appointments){
            if(err) {console.log("could not find"); return res.status(400).json({error: "Could Not Find"})};
            if(appointments.length==0) {
                appointment.save(function (err, a) {

                    if (err) {
                      console.log("could not save");
                      return res.status(400).json({error: "Could Not Save"});
                    }
                    console.log("should send 200")
                    return res.status(200).json(a);
                });
            }else{
                console.log("already created")
                return res.status(400).json({error: "Already Created"});
            }
        });
};


/**
* Gets all of the company's scheduled appointments
* @param req - a request object that contains the company's id
* @param res - a response object that either returns an error message or returns the list of scheduled appointments
*/
module.exports.template.getAll = function(req, res) {
    Appointment.find({company_id: req.params.id}, function(err, result){
            if(err){
                return res.status(400).json(err);
            }
            return res.status(200).json(result);
        });
};


/**
* Gets an appointment by its appointment id
* @param req - a request object that contains the appointment's id
* @param res - a response object that either returns an error message or returns the list of scheduled appointments
*/
module.exports.template.get = function(req, res) {
    Appointment.findOne({_id: req.params.id}, function(err, a) {
        if(err || !a)
            return res.status(400).send({error: "Could Not Find"});
        return res.status(200).json(a);
    });
};

/**
* Updates a visitor's appointment
* @param req - a request object that contains an appointment's id
* @param res - a response object that either returns an error message or updates the appointment
*/
module.exports.template.update = function(req, res){
    Appointment.findOne({_id: req.params.id}, function (err, a) {
        if(err || !a)
            return res.status(401).json({error: "Could Not Find"});

        if (req.body.first_name !== undefined)
            a.first_name = req.body.first_name;

        if (req.body.last_name !== undefined)
            a.last_name = req.body.last_name;

        if (req.body.phone_number !== undefined)
            a.phone_number  = req.body.phone_number ;

        if (req.body.date!== undefined)
            a.date = req.body.date;
        if (req.body.provider_name!== undefined)
            a.provider_name = req.body.provider_name;
        //TODO check if the date is taken already
        a.save(function(err) {
            if(err) {
                return res.status(400).json({error: "Could Not Save"});
            }
            return res.status(200).json(a);
        });
    });
};

/**
* Deletes a visitor's appointment
* @param req - a request object that contains the appointment's id
* @param res - a response object that either returns an error message or deletes the appointment
*/
module.exports.template.delete = function(req, res){
    Appointment.findById(req.params.id, function(err, a) {
        if(err) {
            console.log("Could not find")
            return res.status(400).json({error: "Could Not Find"});
        }
        a.remove(function(err) {
            if(err) {
                return res.status(400).json({error: "Could Not Save"});
            } else {
                console.log("remove succesful")
                return res.status(200).json(a);
            }
        });
    });
};
