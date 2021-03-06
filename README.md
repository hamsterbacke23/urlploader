## Urlploader
Converts back and forth flat arrays to and from tree structured arrays. It uses the urls to establish the tree structure and hierarchy.

[![Build Status](https://secure.travis-ci.org/hamsterbacke23/urlploader.svg)](http://travis-ci.org/hamsterbacke23/urlploader)

### Installation
    npm install urlploader

### Usage
    var urlPloader = require('urlploader');
    var up = new urlPloader(options);

    var flatArray = up.toFlat(myTree);
    var treeArray = up.toTree(flatArray);

### Options

    var options = {
        subItemsKey: 'items',
        urlKey : 'uri',
        ignoreProtocol: true
    }

 - `subItemsKey` <br />
    *default* pages<br />
    *type* string<br />
    The key name which identifies sub items
 - `urlKey` <br />
    *default* url<br />
    *type* string<br />
    The key name which identifies the url
 - `ignoreProtocol` <br />
    *default* false<br />
    *type* boolean<br />
    If true, http, https, //, of urls will be ignored

## Data-example

### Converts this flat array...
    [
      {
        "url": "mydomain.com/blog",
        "title": "Blog"
      },
      {
        "url": "mydomain.com/contact",
        "title": "Contact"
      },
      {
        "url": "mydomain.com/info/sub",
        "data": {
          "key": "value1"
        }
      },
      {
        "url": "mydomain.com/info",
        "title": "Info"
      },
      {
        "url": "mydomain.com",
        "title": "my start page"
      }
    ]



### ...to a tree:
    [{
      "pages": [
        {
          "url": "mydomain.com",
          "title": "my start page",
          "pages": [
            {
              "url": "mydomain.com/blog",
              "title": "Blog"
            },
            {
              "url": "mydomain.com/contact",
              "title": "Contact"
            },
            {
              "url": "mydomain.com/info",
              "title": "Info",
              "pages": [
                {
                  "url": "mydomain.com/info/sub",
                  "data": {
                    "key": "value1"
                  }
                }
              ]
            }
          ]
        }
      ]
    }]


