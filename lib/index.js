'use strict';

// Track the previous interval ID
var prev = 0;

/**
 * no-op.
 *
 * @return {undefined}
 */
function noop() {}

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
