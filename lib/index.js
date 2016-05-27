'use strict';

/**
 * Prev
 */

var prev = 0;

/**
 * Noop
 */

var noop = Function.prototype;

/**
 * Clear all intervals.
 *
 * @api public
 */

function clearIntervals() {
  var tmp;
  var i;

  tmp = i = setInterval(noop);
  while (prev < i) {
    clearInterval(i--);
  }
  prev = tmp;
}

/*
 * Exports.
 */

module.exports = clearIntervals;
