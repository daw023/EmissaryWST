'use strict';

//Import Resources and Libs

var Email = require('../../notification/email');
var Text = require('../../notification/text');

var VisitorList = require('../../models/VisitorList');
var Employee = require('../../models/Employee');
var Appointment = require('../../models/Appointment');

/* handles route for getting the Company's visitor list */

/**
* Gets visitor list of a company
* @param req - a request object that contains the company's id
* @param res - a response object that either returns an error message or creates one if null or returns the visitor list of a company
*/
exports.getCompanyVisitorListReq = function(req, res){
    var company_id=req.params.id;
    exports.getCompanyVisitorList(company_id, function(err_msg, result){
        if(err_msg) return res.status(400).json(err_msg);
        if(result == null){
            result = new VisitorList();
            result.visitors = [];
            result.company_id=companyId;
            result.save(function(err){
                return res.status(200).json(result);
            });
        }else {
            return res.status(200).json(result);
        }
    });
}


/* logic for getting the Company's visitor list */
/**
* Gets visitor list of a company
* @param req - a request object that contains the company's id
* @param res - a response object that either returns an error message or creates one if null or returns the visitor list of a company
*/
exports.getCompanyVisitorList = function(company_id, callback){
    if(!company_id)
        return callback({error: "Please send company id."}, null);
    VisitorList.findOne({company_id: company_id}, function(err, list){
        if(err) return callback({error: "Getting Visitor List"}, null);
        if(list==null) {
            list = new VisitorList();
            list.visitors=[];
            list.company_id = company_id;
        }
        list.save(function(err){
            if(err)return callback({error: "Error in saving"}, null);
            return callback(null, list);
        });
    });
}

/* handles route to delete visitor in the list*/
/**
* Deletes a visitor from a company's visitor list
* @param req - a request object that contains the company's id and visitor id
* @param res - a response object that either returns an error message or deletes the visitor from the visitor list
*/
exports.deleteVisitorReq = function(req, res){
    var visitor_id=req.params.visitor_id;
    var company_id=req.params.company_id;
    exports.deleteVisitor(company_id, visitor_id, function(err_msg, result){
        if(err_msg)  return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
}

/* logic for deleting the visitor in the list */
/**
* Deletes a visitor from a company's visitor list
* @param req - a request object that contains the company's id and visitor id
* @param res - a response object that either returns an error message or deletes the visitor from the visitor list
*/
exports.deleteVisitor = function(company_id, visitor_id, callback){
    if(!company_id)
        return callback({error: "Please send company id."}, null);
    if(!visitor_id)
        return callback({error: "Please send visitorList id."}, null);
    VisitorList.findOneAndUpdate(
        {company_id: company_id},
        {$pull: {visitors:{_id:visitor_id}}},
        {safe: true, upsert: true, new:true}, function(err, data){
            if(err) return callback({error: "Can't update list"}, null);
            return callback(null, data);
        });
}

/* clear the list */
/**
* Clears the entire visitor list
* @param req - a request object that contains the list id
* @param res - a response object that either returns an error message or clears the entire list
*/
exports.deleteReq = function(req, res){
    var list_id=req.params.id;
    exports.delete(list_id, function(err_msg, result){
        if(err_msg)  return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
}

/**
* Clears the entire visitor list
* @param req - a request object that contains the list id
* @param res - a response object that either returns an error message or clears the entire list
*/
exports.delete = function(list_id, callback){
    if(!list_id)
        return callback({error: "Please send list id."}, null);
    VisitorList.findOne({_id: list_id}, function(err, list){
        if(err || list==null) return callback({error: "Can't find company"}, null);
        list.visitors=[];
        list.save(function(err){
            if(err) return callback({error: "Can't save"}, null);
            return callback(null, list);
        });
    });
}
// This route will be called when a visitor checks in
/**
* Create a visitor when the visitor checks into the system
* @param req - a request object that contains the visitor checkin form information
* @param res - a response object that either returns an error message or creates a visitor
*/
exports.createReq = function(req, res) {
    exports.create(req.body, function(err_msg, result){
        if(err_msg)  return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
}

/**
* Create a visitor when the visitor checks into the system
* @param req - a request object that contains the visitor checkin form information, company id, visitor's first name
*			   last name, phone number, check in time and additional information
* @param res - a response object that either returns an error message or creates a visitor
*/
exports.create = function(param, callback){
    //required fields
    var company_id = param.company_id;
    var first_name = param.first_name;
    var last_name = param.last_name;
    var phone_number = param.phone_number;
    var checkin_time = param.checkin_time;

    //optional dic var
    var additional_info = param.additional_info;

    // find all the appointments for this visitor
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow= new Date();
    tomorrow.setDate(today.getDate()+1);
    tomorrow.setHours(0, 0, 0, 0);

    var query=
    {
        company_id: company_id,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        is_checkedin: false
       
    };

    Appointment.find(query).sort({date: -1}).exec(function(err, appointments){
        console.log(appointments);
        var applist = [];
        var the_appointment = undefined;
        if(appointments.length > 0){
            applist.push(appointments[0]);
            the_appointment = appointments[0];
        }
        var visitor =
        {
            company_id: company_id,
            last_name: last_name,
            first_name: first_name,
            phone_number: phone_number,
            checkin_time: checkin_time,
            additional_info: additional_info,
            appointments: applist
        };
        VisitorList.findOne(
            {company_id: company_id},
            function(err, list) {
                if(err)
                    return callback({error: "an error occured while finding"}, null);
                if(list==null) {
                    list = new VisitorList();
                    list.visitors=[];
                    list.company_id = company_id;
                }
                list.visitors.push(visitor);
                list.save(function(err){
                    if(err) return callback({error: "an error in saving"}, null);
                    if(the_appointment == undefined){
                        return callback(null, list); 
                    }
                    the_appointment.is_checkedin = true;
                    console.log("visitor list find one");
                    Text.sendText(the_appointment.first_name + the_appointment.last_name, [{phone_number: '5014139826'}], false);

                    the_appointment.save(function (err, checkedin_appointment){
                        if(err) return callback({error: "an error in saving"}, null);
                        return callback(null, list);
                    });
                    
                    /*Employee.find({company : req.body.company_id},
                     function(err, employees) {
                     var i = 0;
                     var respond = function() {
                     i++;
                     if(i == employees.length) {
                     res.status(200).json(list);
                     }
                     };

                     Email.sendEmail(req.body.name, employees, function(){respond();});
                     TextModel.sendText(req.body.name, employees, function(){respond();});
                     }
                     );*/
                });
            }
        );
    });
}

