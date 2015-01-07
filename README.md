[![Build Status](https://secure.travis-ci.org/hamsterbacke23/urlploader.svg)](http://travis-ci.org/hamsterbacke23/urlploader)

## What does it do?
Converts back and forth flat arrays with `url`-keys and arbitrary data to tree structured arrays.
Like so:

### Tree:
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


### Flat:
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

## Usage
    var urlPloader = require('urlploader');
    var up = new urlPloader({subItemKey: 'pages'});

    var flatArray = up.toFlat(myTree);
    var treeArray = up.toFlat(flatArray);


