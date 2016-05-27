'use strict';

var assert = require('proclaim');
var clear = require('../lib');

describe('clear-intervals', function() {
  var j = 0;

  function incr() { ++j; }
  setInterval(incr, 50);
  setInterval(incr, 100);

  it('should clean all intervals', function(done) {
    setTimeout(function() {
      clear();
      assert(j === 3);
      done();
    }, 101);
  });

  it('should cleanup', function() {
    clear();
  });
});
