'use strict';
import crypto from 'crypto';

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
var exports = module.exports;

const SECRET = 'Powellcse112';
export function passwordHash(password = '') {
  const hash =  crypto.createHmac('sha256', SECRET)
    .update(password)
    .digest('hex');
  return hash;
};


var Employee = require('../../models/Employee');
var Company = require('../../models/Company');

exports.login = function(req, res) {
    Employee.findOne(
      {email:req.body.email, password: passwordHash(req.body.password) },
      function(err, e) {
        if(err || !e){
          return res.status(400).send({error: "Can not Find"});
        }
        var employee_json=e.toJSON();
        delete employee_json.password;
        return res.status(200).json(employee_json);
    });
};

exports.getAllEmployees = function(req, res) {
  Employee.find({company_id : req.params.id}, { password: 0}, function(err, result) {
    if(err){
      return res.status(400).send({error: "Can not Find"});
    }
    return res.status(200).json(result);
  });
};

exports.getById = function(req, res) {
   Employee.findById(req.params.id, { password: 0}, function(err, employee) {
      if(err) {
          return res.status(400).json({error: "Can not Find"});
      } else {
          return res.status(200).json(employee);
      }
    });
};

exports.insert = function(req, res) {
    var employee = new Employee();
    /* required info */
    employee.first_name = req.body.first_name;
    employee.last_name = req.body.last_name;
    employee.email = req.body.email,
    employee.phone_number  = req.body.phone_number,
    employee.company_id = req.body.company_id,
    employee.password = passwordHash(req.body.password),
    employee.role =  req.body.role

  if (!employee.company_id) {
      // Try to find company_id from the name
      // QUERY FOR company id with name
    Company.findOne({company_name:employee.company_name}, function(err, e) {
        if(err || !e){
          return res.status(400).send({error: "Can not find Company of Employee"});
        }
    });
    employee.company_id = foundId;
  }

  Employee.findOne({
      first_name: employee.first_name, 
      last_name: employee.last_name,
      email: employee.email,
      company_id: employee.company_id
    }, function (err, employee) {
      if(!!employee) {
        return res.status(400).json({error: "User already exists"});
      }
    }
  );

  employee.save(function(err, e) {
    if(err) {
      return res.status(400).json({error: "Can not Save"});
    }
    var employee_json=e.toJSON();
    delete employee_json.password;
    return res.status(200).json(employee_json);
  });
};


exports.update = function(req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if(err)
            return res.status(400).json({error: "Can not Update"});
 
        employee.first_name = req.body.first_name || employee.first_name;
        employee.last_name = req.body.last_name || employee.last_name;
        employee.email = req.body.email || employee.email;
        employee.phone_number = req.body.phone_number || employee.phone_number;
        employee.password = passwordHash(req.body.password) || employee.password;
        employee.role = req.body.role || employee.role;

        employee.save(function(err) {
            console.log(err);
            if(err)
                return res.status(400).json({error: "Can not Save"});
            var employee_json=employee.toJSON();
            delete employee_json.password;
            return res.status(200).send(employee_json);
        });
   });
};

exports.delete = function(req, res) {
  console.log('mark', req.params);
  Employee.findById(req.params.id, function(err, employee) {
    return employee.remove(function(err) {
      if(err) {
        res.status(400).json({error: "Can not Find"});
      } else {
          var employee_json=employee.toJSON();
          delete employee_json.password;
          return res.status(200).send(employee_json);
      }
    });
  });
};
