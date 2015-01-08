var urlPloader = require('../urlploader'),
  fs = require('fs'),
  util = require('util'),
  expect = require('chai').expect;


describe("Urlploader", function() {
  describe("#toTree", function() {
    var flatMock, up;
    before(function(done) {
      fs.readFile('test/mock/flat.json', 'utf8', function (err, data) {
        if (err) throw err;
        flatMock = JSON.parse(data);

        done();
      });
      up = new urlPloader();
    });

    it("should produce the input object after building a tree and flattening it again", function(done) {
      var tmp = JSON.parse(JSON.stringify(flatMock));
      var tree = up.toTree(tmp);
      var flat = up.toFlat(tree);

      expect(flat).to.deep.include.members(flatMock);
      done();
    });


  });

  describe("#toFlat", function() {
    var treeMock, up;

    before(function(done) {
      fs.readFile('test/mock/tree.json', 'utf8', function (err, data) {
        if (err) throw err;
        treeMock = JSON.parse(data);
        done();
      });

      up = new urlPloader();
    });

    it("should produce the same tree after flattening it and rebuiling a tree again", function() {

      var tmp = JSON.parse(JSON.stringify(treeMock));
      var flat = up.toFlat(tmp);
      var tree = up.toTree(flat);

      expect(treeMock).to.deep.include.members(tree);
    });

  });

  describe("options", function() {
    var treeMock, up;

    before(function(done) {
      fs.readFile('test/mock/simpleTree.json', 'utf8', function (err, data) {
        if (err) throw err;
        treeMock = JSON.parse(data);
        done();
      });
    });

    it("should be able to use custom options", function() {
      up = new urlPloader({
        urlKey : 'uri',
        subItemsKey : 'items',
        ignoreProtocol : true
      });

      var tmp = JSON.parse(JSON.stringify(treeMock));
      var flat = up.toFlat(tmp);
      var tree = up.toTree(flat);

      expect(treeMock).to.deep.include.members(tree);
    });

  });

});