

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

function extend(){
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        arguments[0][key] = arguments[i][key];
      }
    }
  }
  return arguments[0];
}

function getTree(parents) {
  var result = [];

  parents.forEach(function(parent, index, array) {
    var lastUrlPart;
    var newUrl;
    var newItem;
    var pages;
    var tmpParts;
    var cutLength

    var parts = parent.url.split('/');
    var tmpData = {
      pages: parent.pages
    };
    var paths = temp = [];

    var lastIndex = parts.length - 1;


    for (var i = 0; i < parts.length; i++) {

      pages = [];
      tmpParts = parts.slice(); // copy array

      // cut last few items away from all parts to get current url
      cutLength = lastIndex - i > 0 ? lastIndex - i  : 0;
      tmpParts.splice(- cutLength,  cutLength );
      newUrl = tmpParts.join('/');

      // make new item
      newItem = {
        pages: pages,
        url : newUrl
      };


      // if last item, overwrite with available data
      if (i === lastIndex) {
        newItem = extend(newItem, tmpData);
      }

      temp.push(newItem);
      temp = newItem.pages;

    }
    console.log(paths);

    // for (var i = 0; i < paths.length; i++) {
    //   i
    //   paths[i]
    // };


  });
  return result;
}

