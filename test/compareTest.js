var urlPloader = require('../urlploader'),
  fs = require('fs'),
  util = require('util'),
  expect = require('chai').expect;

describe("Urlploader", function() {
  describe("#toTree", function() {
    var flatMock;
    before(function(done) {
      fs.readFile('test/mock/flat.json', 'utf8', function (err, data) {
        if (err) throw err;
        flatMock = JSON.parse(data);

        done();
      });
    });

    it("should produce the input object after building a tree and flattening it again", function(done) {
      var up = new urlPloader();

      var tmp = JSON.parse(JSON.stringify(flatMock));

      var tree = up.toTree(tmp);

      var flat = up.toFlat(tree);

      expect(flat).to.deep.equal(flatMock);
      done();
    });

    after(function() {

    });
  });

  // describe("#toFlat", function() {
  //   var treeMock;
  //   before(function(done) {
  //     fs.readFile('test/mock/tree.json', 'utf8', function (err, data) {
  //       if (err) throw err;
  //       treeMock = JSON.parse(data);
  //       done();
  //     });
  //   });

  //   it("should produce the input object after building a tree and flattening it again", function(done) {
  //     var up = new urlPloader();
  //     var flat = up.toFlat(treeMock);

  //     // console.log(JSON.stringify(flat, null, 2));
  //     up = new urlPloader();
  //     var tree = up.toTree(flat);
  //     // console.log('tree', JSON.stringify(tree, null, 2));

  //     expect(tree).to.deep.equal(treeMock);
  //     done();
  //   });

  //   after(function() {

  //   });
  // });

});