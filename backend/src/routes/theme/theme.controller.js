'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */
var express = require('express');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

var Theme = require('../../models/Theme');

/*********************** THEME TEMPLATE ROUTES ***********************/
module.exports.template = {};

module.exports.template.use = function(req, res, next) {
    // do logging
    console.log('Intializing.....');
    next();
};

/**
* Creates a default form theme
* @param req - a request object that contains the comapny's or the user's id
* @param res - a response object that either returns an error message or returns created the form's theme
*
*/
module.exports.template.create = function(req, res) {
    var theme = new Theme();
    theme.user_id = req.params.user_id; //company or user id
    theme.form_color = "default";
    theme.background_img = "default";
    theme.displayPhone = false;
    theme.displayClock = false;
    theme.displaySignature = false;
    theme.additionalComments = false;

    theme.save(function(err) {
        if (err)
            res.status(400).send(err);

        res.status(200).json(theme);
    });

};

/**
* Gets the form's theme
* @param req - a request object that contains the company's or user's  id
* @param res - a response object that either returns an error message or returns the form's theme
*
*/
module.exports.template.get = function(req, res) {
    Theme.findOne({
        user_id: req.params.user_id
    }, function(err, theme) {
        if (err)
            res.status(400).send(err);

        res.status(200).json(theme);
    });
};

/**
* Updates the form's theme
* @param req - a request object that contains the company's or the user's id
* @param res - a response object that either returns an error message or updates the form's theme if it is changed
*
*/
module.exports.template.update = function(req, res) {

    Theme.findOne({
        user_id: req.params.user_id
    }, function(err, theme) {

        if (err)
            res.status(400).send(err);

        theme.user_id = req.params.user_id; //company or user id
        if (req.body.form_color)
            theme.form_color = req.body.form_color;
        if (req.body.background_img)
            theme.background_img = req.body.background_img;
        if (req.body.displayPhone)
            theme.displayPhone = req.body.displayPhone;
        if (req.body.displayClock)
            theme.displayClock = req.body.displayClock;
        if (req.body.displaySignature)
            theme.displaySignature = req.body.displaySignature;
        if (req.body.additionalComments)
            theme.additionalComments = req.body.additionalComments;

        theme.save(function(err) {
            if (err)
                res.status(400).send(err);

            res.status(200).json(theme);
        });

    });
};


/**
* Deletes the form's theme
* @param req - a request object that contains the company's or the user's id
* @param res - a response object that either returns an error message or deletes the form's theme
*
*/
module.exports.template.delete = function(req, res) {

    Theme.remove({
        user_id: req.params.user_id
    }, function(err, theme) {
        if (err)
            res.status(400).send(err);

        res.status(200).json({msg: "OK"});
    });


};
