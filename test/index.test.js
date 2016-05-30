'use strict';

var assert = require('proclaim');
var clearIntervals = require('../lib');

describe('clear-intervals', function() {
  var interval;
  var j = 0;

  beforeEach(function() {
    interval = setInterval(function() {
      j += 1;
    }, 10);
  });

  afterEach(function() {
    clearInterval(interval);
  });

  it('should clean all intervals', function(done) {
    setTimeout(function() {
      assert.strictEqual(j, 1);
      setTimeout(function() {
        assert.strictEqual(j, 2);
        clearIntervals();
        setTimeout(function() {
          assert.strictEqual(j, 2);
          done();
        }, 40);
      }, 11);
    }, 11);
  });
});
