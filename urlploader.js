var deepExt = require('deep-extend');

// Constructor
function UrlPloader(options) {
  var defaultOptions = {
    subItemsKey:    'pages',
    urlKey:         'url',
    ignoreProtocol: false
  };
  this.options = deepExt(defaultOptions, options);
}

/**
 * Makes a flat array out of tree array
 * @param  {array} tree array
 * @param  {array} flatResult with objects, passed in recursivley
 * @return {array} flat array with objecs
 */
UrlPloader.prototype.toFlat = function(tree, flatResult) {
  var subItemsKey = this.options.subItemsKey;

  flatResult = flatResult ? flatResult : [];

  for(var key in tree) {
    if (!tree.hasOwnProperty(key)) {
      continue;
    }
    if (tree[key][subItemsKey] && tree[key][subItemsKey].length) {
      this.toFlat(tree[key][subItemsKey], flatResult);
    }

    var tmp = tree[key];

    delete tmp[subItemsKey];

    if(tmp && Object.keys(tmp).length > 0) {
      flatResult.push(tmp);
    }
  }

  return flatResult;
};

/**
 * Helper function to get rid of associative kets
 * @param  {array} tree array with associative keys
 * @return {[array} tree array without assosciative keys
 */
UrlPloader.prototype.getRidOfAssocKeys = function(input) {
  if(input.constructor !== Array && input.constructor !== Object) {
    return input;
  }
  var subItemsKey = this.options.subItemsKey;

  // first iteration: loop through current item once
  // and clean out array keys from array
  for(var key in input) {
    if (!input.hasOwnProperty(key)) {
      continue;
    }

    // recurse
    input[key] = this.getRidOfAssocKeys(input[key]);

    // for arrays convert them to non-associative
    if (key === subItemsKey && input[key].constructor === Array) {
      var tmpArr = [];
      for(var subKey in input[key]) {
        tmpArr.push(input[key][subKey]);
      }
      input[key] = tmpArr;
    }
  }

  return input;

};


/**
 * Main function to build the tree
 * @param  {array} parent child objects
 * @return {array} tree strucure array with objects
 */
UrlPloader.prototype.toTree = function(items) {
  var subItemsKey = this.options.subItemsKey,
    urlKey = this.options.urlKey,
    ignoreProtocol = this.options.ignoreProtocol;

  // build empty structure
  // can this be done more cleanly?
  var resultArr = [];
  var result = {};
  resultArr[0] = result;
  result[subItemsKey] = [];

  items.forEach(function(item, index, array) {
    var newId, newItem, tmpParts, cutLength;

    var rgxPattern = new RegExp('https?:\/\/|^(\/*)', 'gi');
    var matches = item[urlKey].match(rgxPattern);

    if(matches.length > 1) {
      throw "Error: Url can not be processed via regex matches: " + matches.join(', ');
    }
    var urlPrefix = matches.length && ignoreProtocol === false ? matches[0] : '';
    var urlId = item[urlKey].replace(rgxPattern, "");

    var parts = urlId.split('/');
    var tmpData = item;

    var temp = [];
    var paths = temp;
    var lastIndex = parts.length - 1;
    var key;

    for (var i = 0; i < parts.length; i++) {

      tmpParts = parts.slice(); // copy array

      // cut last few items away from all parts to get current url
      cutLength = lastIndex - i > 0 ? lastIndex - i  : 0;
      tmpParts.splice(- cutLength,  cutLength );
      newId = urlPrefix + tmpParts.join('/');

      // create new item
      newItem = {};
      newItem[subItemsKey] = [];
      newItem[urlKey] = newId;

      // if last item, overwrite with available data
      if (i === lastIndex) {
        delete newItem[subItemsKey]; // delete again for clean output of tmpData
        newItem = deepExt(newItem, tmpData);
      }

      temp[newId] = newItem;
      temp = newItem[subItemsKey];
    }
    result[subItemsKey] = deepExt(result[subItemsKey], paths);
  });
  result = this.getRidOfAssocKeys(result);

  return resultArr;
};


module.exports = UrlPloader;






