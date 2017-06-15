/**
 * @author Anthony Altieri on 6/10/17.
 */

// We will use axios (it's on github check it out) to make our actual calls
import axios from 'axios';
import queryString from 'query-string';

/** 
 * This file defines the wrapper that points our http/https calls to our backend
 * depending on our development environment, if we are in development we are
 * going to query our local server, if we are in staging we are going to
 * query the staging server and if production we are going to  query the
 * deployed server
 */

// In milliseconds
const DEFAULT_REQUEST_TIMEOUT = 1000;

const DEFAULT_DEVELOPMENT_PORT = 4941;

// NOTE: You probably are going to need to change the staging/production
// host/port to wherever you are actually deploying to
const STAGING_HOST = '';
const STAGING_PORT = 80;
const PRODUCTION_HOST = '';
const PRODUCTION_PORT = 80;


console.log('process.env.NODE_ENV', process.env.NODE_ENV);
let host;
let port;
if (process.env.NODE_ENV === 'development') {
  host = 'localhost';
  port = DEFAULT_DEVELOPMENT_PORT;
} else if (process.env.NODE_ENV === 'staging') {
  host = STAGING_HOST;
  port = STAGING_PORT;
} else if (process.env.NODE_ENV === 'production') {
  host = PRODUCTION_HOST;
  port = PRODUCTION_PORT;
} else {
  throw new Error('The environment variable NODE_ENV must be either: '
    + 'development, staging, or production. Note that for the frontend the'
    + ' environment variables are set in Webpack');
}

// Initialize an axios instance with our custom information
const instance = axios.create({
  baseURL: `http://${host}:${port}/api`,
  timeout: DEFAULT_REQUEST_TIMEOUT,
  // You might want to add a header with a security token (check axios docs)
});
console.log('axios instance', instance);
console.log('baseUrl', `${host}:${port}/api`);

/**
* Post request
* @param url
* @param data
* @return {Promise<*>} - Returns parameters list of data to be processed by a specified resource
*/
export function post(url, data) {
  console.group('POST');
  console.log('%c URL', 'color: blue', url);
  console.log('%c Data', 'color: green', data);
  console.groupEnd();
  return new Promise((resolve, reject) => {
    instance({ method: 'post', url, data })
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

/**
* Get request
* @params url
* @return {Promise<*>}  - Returns requested data from url query string
*/
export function get(url) {
  console.group('GET');
  console.log('%c URL', 'color: blue', url);
  console.groupEnd();
  return new Promise((resolve, reject) => {
    try {
      instance({ method: 'get', url })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    } catch (e) {
      // queryString.stringify failed on data
      throw new Error('Data could not be converted to querystring| Error: ' + e);
    }
  })
}

/**
* Put request
* @params url
* @params withCredentials
* @return {Promise<*>}  - Returns parameters list of data to be processed by a specified resource
*/
export function put(url, data = {}) {
  console.group('PUT');
  console.log('%c URL', 'color: blue', url);
  console.log('%c Data', 'color: green', data);
  console.groupEnd();
  return new Promise((resolve, reject) => {
    try {
      instance({ method: 'put', url, data })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    } catch (e) {
      // queryString.stringify failed on data
      throw new Error('Data could not be converted to querystring| Error: ' + e);
    }
  })
}

// This function will handle the creation of a querystring
// NOTE: this is for DELETE
/**
* Delete request
* @params url
* @params data
* @return {Promise<*>}  - Removes data from a specified source
*/
export function del(url, data = {}) {
  console.group('DELETE');
  console.log('%c URL', 'color: blue', url);
  console.log('%c Data', 'color: green', data);
  console.groupEnd();
  return new Promise((resolve, reject) => {
    try {
      instance({ method: 'delete', url, data })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    } catch (e) {
      // queryString.stringify failed on data
      throw new Error('Data could not be converted to querystring| Error: ' + e);
    }
  })
}

export default { post, get, put, del };