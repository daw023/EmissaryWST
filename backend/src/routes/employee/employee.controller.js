'use strict';
import crypto from 'crypto';

/**
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

/**
* Logs in an employee
* @param req - a request object that contains an employee's email and password
* @param res - a response object that either returns an error message or logs the employee into the system
*
*/
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

/**
* Retrieves all of the employees that have an account for the company
* @param req - a request object that contains the company's id
* @param res - a response object that either returns an error message or returns the list of employees at the company
*/
exports.getAllEmployees = function(req, res) {
  Employee.find({company_id : req.params.id}, { password: 0}, function(err, result) {
    if(err){
      return res.status(400).send({error: "Can not Find"});
    }
    return res.status(200).json(result);
  });
};

/**
* Gets an employee by their employee id
* @param req - a request object that contains the employee's id
* @param res - a response object that either returns an error message or returns the employee
*/
exports.getById = function(req, res) {
   Employee.findById(req.params.id, { password: 0}, function(err, employee) {
      if(err) {
          return res.status(400).json({error: "Can not Find"});
      } else {
          return res.status(200).json(employee);
      }
    });
};

/**
* Adds an employee to a company
* @param req - a request object that contains the company's id, employee's first name, last name, email, phone number, password, and role
* @param res - a response object that either returns an error message or adds the employee to the company
*/
exports.insert = async function(req, res) {
  var employee = new Employee();
  employee.first_name = req.body.first_name;
  employee.last_name = req.body.last_name;
  employee.email = req.body.email,
  employee.phone_number  = req.body.phone_number,
  employee.company_name = req.body.company_name,
  employee.password = passwordHash(req.body.password),
  employee.role = req.body.role

  try {
    var company = await Company.findOne({name:employee.company_name});
    if(!company) {
      console.log("Company not found")
      return res.status(400).json({error: "Company not found"})
    } else {
      employee.company_id = company._id
    }

    var foundEmployee = await Employee.findOne(
      {
        first_name: employee.first_name, 
        last_name: employee.last_name,
        email: employee.email,
        company_id: employee.company_id
      });

    if(!!foundEmployee) {
      console.log("User already exists")
      return res.status(400).json({error: "User already exists"})
    }

    var savedEmployee = await employee.save()
    var employee_json=savedEmployee.toJSON();
    delete employee_json.password;

    return res.status(200).json(employee_json);
  }
  catch(e) {
    console.log(e)
    console.log("Database error")
    return res.status(400).json({error: "Database error"})
  }

};

/**
* Updates an employee's information
* @param req - a request object that contains the employee's first name, last name, email. phone number, password, and role
* @param res - a response object that either returns an error message or updates the employee's information 
*				based on if the information has been changed
*/
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

/**
* Deletes an employee
* @param req - a request object that contains the employee's id
* @param res - a response object that either returns an error message or deletes an employee from the company
*/
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
