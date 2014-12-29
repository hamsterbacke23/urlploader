

var items = [
    {url: 'domain.com/a/veranstaltungen' , title: 'blubb', blocks:['a', 'b','c']},
    {url: 'domain.com/a/b/bibabutze', title: 'blubb1', blocks:['a', 'b','c']},
    {url: 'domain.com/a/b/mann', title: 'blubb2', blocks:['a', 'b','c']},
    {url: 'domain.com/a/b/troll', title: 'blubb3', blocks:['a', 'b','c']},
    {url: 'domain.com/a/c/vollab', title: 'blubb4', blocks:['a', 'b','c']},
    {url: 'domain.com/a/d/geht', title: 'blubb5', blocks:['a', 'b','c']},
    {url: 'domain.com/a/d/a/diepost', title: 'blubb6', blocks:['a', 'b','c']}
];


function getParents(items) {
  var result = [];
  items.forEach(function(item, index, array)
  {
      var parentKey;
      var parent = [];
      // url = str_replace('http://', '', url);
      var parts = item.url.split('/');
      var lastItem;

      if(parts.length > 2) {
        lastItem = parts.splice(-1, 1);
        parentKey = parts.join('/');
        parent[parentKey] = lastItem;
      } else {
        parentKey = parts.join('/');
      }

      var tItem = {};
      var pages = [];
      pages.push(item);
      tItem.pages = pages;
      tItem.url = parentKey;

      result.push(tItem);

  });

  return result;
}


parents = getParents(items);
console.log(getTree(parents));


// function getElementPosition(result, usedParts, leftParts) {
//   // result[usedPart1][usedPart2]
//   if(parts.length > 1) {
//     var firstItem = parts.slice(0,1)[0];
//     result.url = firstitem;
//     result.pages = [];

//     return getElementPosition
//   }
// }

function getTree(parents) {
  var result = [];

  parents.forEach(function(parent, index, array) {
    var parts = parent.url.split('/');
    var tmpPart = parts[parts.length - 1];
    parts[parts.length - 1] = {};
    parts[parts.length - 1].part = tmpPart;
    parts[parts.length - 1].pages = parent.pages;

    var paths = temp = {};

    var lastUrlPart;
    var newUrl;
    var pages;
    var tmpParts;
    for (var i = 0; i < parts.length; i++) {
      pages = parts[i] instanceof Object ? parts[i].pages : [];
      lastUrlPart = parts[i] instanceof Object ? parts[i].part : parts[i];
      tmpParts = parts.slice(); // copy array
      tmpParts.pop();

      var cutLength = parts.length - i - 1 > 0 ? parts.length - i - 1 : 0;

      tmpParts.splice(-1,  cutLength);

      newUrl = tmpParts.join('/');
      newUrl = newUrl  + '/' + lastUrlPart;

      temp[parts[i]] = {};

      temp[parts[i]].pages = pages;
      temp[parts[i]].url = newUrl;
      temp = temp[parts[i]].pages;
    }
    console.log(paths);

    // for (var i = 0; i < paths.length; i++) {
    //   i
    //   paths[i]
    // };


  });
  return result;
}

