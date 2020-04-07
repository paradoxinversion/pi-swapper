"use strict";
var util = require("util");
function NoIdentifierError() {
  //Inheritance from Error Object
  Error.call(this);
  Error.captureStackTrace(this, this.constructor); //Super Helper to show stack trace
  this.name = this.constructor.name;
  this.message = "No identifiers present in input string.";
}
util.inherits(NoIdentifierError, Error);
exports = module.exports = NoIdentifierError;
