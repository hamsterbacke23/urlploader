var deepExt = require('deep-extend');

// Constructor
function UrlPloader(options) {
  var defaultOptions = {
    subItemsKey : 'pages'
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
    if(tree[key].expand === true) {
      var tmp = tree[key];
      delete tmp[subItemsKey];
      delete tmp.expand;
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
    if (key === subItemsKey && input[key].constructor === Array) {
      var tmpArr = [];
      for(var subKey in input[key]) {
        tmpArr.push(input[key][subKey]);
      }
      input[key] = tmpArr;
    }
  }

  // just recurse
  for(var key2 in input) {
    if (!input.hasOwnProperty(key2)) {
      continue;
    }
    input[key2] = this.getRidOfAssocKeys(input[key2]);
  }

  return input;

};


/**
 * Main function to build the tree
 * @param  {array} parent child objects
 * @return {array} tree strucure array with objects
 */
UrlPloader.prototype.toTree = function(items) {
  var subItemsKey = this.options.subItemsKey;

  // build empty structure
  // can this be done more cleanly?
  var resultArr = [];
  var result = {};
  resultArr[0] = result;
  result[subItemsKey] = [];

  var j = 0;

  items.forEach(function(item, index, array) {
    var newUrl, newItem, tmpParts, cutLength;

    var parts = item.url.split('/');
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
      newUrl = tmpParts.join('/');

      // make new item
      newItem = {};
      newItem[subItemsKey] = [];
      newItem.url = newUrl;
      newItem.expand = false;

      key = parts[i];

      // if last item, overwrite with available data
      if (i === lastIndex) {
        newItem.expand = true;
        newItem = deepExt(newItem, tmpData);

        // as it is the last item, make key unique
        key = key + j;
        j++;
      }

      temp[key] = newItem;
      temp = newItem[subItemsKey];
    }
    result[subItemsKey] = deepExt(result[subItemsKey], paths);
  });
  result = this.getRidOfAssocKeys(result);

  return resultArr;
};


module.exports = UrlPloader;






