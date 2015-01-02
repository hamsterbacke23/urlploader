
var deepExt = require('deep-extend');

var subItemsKey = 'pages';

var items = [
    {url: 'domain.com/a/veranstaltungen' , title: 'blubb', blocks:['a', 'b','c']},
    {url: 'domain.com/a/b/bibabutze', title: 'blubb1', blocks:['a', 'b','c']},
    {url: 'domain.com/a/b/mann', title: 'blubb2', blocks:['a', 'b','c']},
    {url: 'domain.com/a/b/troll', title: 'blubb3', blocks:['a', 'b','c']},
    {url: 'domain.com/a/c/vollab', title: 'blubb4', blocks:['a', 'b','c']},
    {url: 'domain.com/a/d/geht', title: 'blubb5', blocks:['a', 'b','c']},
    {url: 'domain.com/a/d/a/diepost1', title: 'blubb6', blocks:['a', 'b','c']},
    {url: 'blobb.com/a/d/a/diepost2', title: 'blubb6', blocks:['a', 'b','c']},
    {url: 'blobb.com/a/a/diepost3', title: 'blubb6', blocks:['a', 'b','c']},
    {url: 'blobb.com/a/a/diepost5', title: 'blubb6', blocks:['a', 'b','c']},
    {url: 'klob.com/a/a/diepost4', title: 'blubb6', blocks:['a', 'b','c']}
];

function treeToFlat(tree, flatResult) {
  flatResult = flatResult ? flatResult : [];

  for(var key in tree) {
    if (!tree.hasOwnProperty(key)) {
      continue;
    }
    if(tree[key].expand === true) {
      delete tree[key].expand;
      flatResult.push(tree[key], flatResult);
    }
    if (tree[key][subItemsKey]) {
      treeToFlat(tree[key][subItemsKey], flatResult);
    }
  }

  return flatResult;
}

parents = getParents(items);

var treeRes = getTempTree(parents);
// console.log('treeRes', JSON.stringify(treeRes, null, 2));

// console.log('treeRes',treeRes);
var test = treeRes.slice();
var flat = treeToFlat(test);
// console.log(tree);
console.dir(flat);
// console.log(JSON.stringify(treeRes, null, 2));
// console.log(JSON.stringify(flatResult, null, 2));

function getParents(items) {
  var result = [];
  items.forEach(function(item, index, array)
  {
      var parentKey;
      var parent = [];
      var parts = item.url.split('/');
      item.expand = true; // set identifier to be able to flatten again

      var lastItem;

      // get the current url for current item
      if(parts.length > 2) {
        lastItem = parts.splice(-1, 1);
        parentKey = parts.join('/');
        parent[parentKey] = lastItem;
      } else {
        parentKey = parts.join('/');
      }

      var tItem = {};
      var subItems = [];
      subItems.push(item);
      tItem[subItemsKey] = subItems;
      tItem.url = parentKey;

      result.push(tItem);

  });

  return result;
}




function getRidOfAssocKeys(input) {
  if(input.constructor !== Array && input.constructor !== Object) {
    return input;
  }

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
    input[key2] = getRidOfAssocKeys(input[key2]);
  }

  return input;

}

function getTempTree(parents) {
  var resultArr = [];
  var result = {};
  resultArr[0] = result;
  result[subItemsKey] = [];
  var j = 0;


  parents.forEach(function(parent, index, array) {

    var newUrl;
    var newItem;
    var tmpParts;
    var cutLength;

    var parts = parent.url.split('/');
    var tmpData = {};
    tmpData[subItemsKey] = parent[subItemsKey];

    var temp = [];
    var paths = temp;
    var lastIndex = parts.length - 1;
    var key;
    var flagKey;

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


      // if last item, overwrite with available data
      key = parts[i];

      if (i === lastIndex) {
        newItem = deepExt(newItem, tmpData);
        key = key + j;
        j++;
      }

      console.log(key);


      temp[key] = newItem;
      temp = newItem[subItemsKey];
    }
    result[subItemsKey] = deepExt(result[subItemsKey], paths);
  });
  result = getRidOfAssocKeys(result);
  return resultArr;
}

