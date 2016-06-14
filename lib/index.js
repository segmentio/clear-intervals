'use strict';

// XXX(ndhoule): Handle on Function#apply to get around IE7/8 ghettry
var apply = Function.prototype.apply;

// Keep a handle on original timer globals
var nativeSetInterval = global.setInterval;
var nativeClearTimeout = global.clearInterval;

// Track a list of interval IDs
var intervalIds = [];

/**
 * Clear a list of setTimeout timer IDs.
 */
function clearIntervals() {
  for (var i = 0; i < intervalIds.length; i += 1) {
    nativeClearTimeout(intervalIds[i]);
  }

  // Reset the list of tracked timeout IDs
  intervalIds.length = 0;
}

/**
 * Override `global.setInterval` with a function that tracks all setInterval
 * timer IDs and then delegates to `global.setInterval`.
 *
 * Note that any intervals that were in effect prior to installing the tracker will *not* be cleared.
 *
 * @param {Object} [context=global] The context to override `setInterval` in.
 */
function installMockSetInterval(context) {
  context = context || global;
  // Reset the list of tracked timeout IDs
  intervalIds.length = 0;

  // IE7/8: Move setTimeout off proto and onto instance
  global.setInterval = global.setInterval;
  global.setInterval = function setInterval() {
    // XXX(ndhoule): IE7/8 are ghetto so setInterval.proto !== Function.proto
    var id = apply.call(nativeSetInterval, global, arguments);
    intervalIds.push(id);
    return id;
  };
}

// Automatically override `global.setInterval` and start tracking timeout IDs
installMockSetInterval();

/*
 * Exports.
 */

module.exports = clearIntervals;
module.exports.install = installMockSetInterval;
