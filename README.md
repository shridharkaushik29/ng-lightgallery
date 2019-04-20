# ng-lightgallery

This is an wrapper for Angular 1.x around the great light gallery plugin https://sachinchoolur.github.io/lightGallery. Package includes a **demo** inside the `/dist` directory.

**Typescript Support**

`ng-lightgallery` plays well with the typescript as the package is developed in typescript and includes the type declaration files, so feel free to use it with typescript and a nice editor like *IntelliJ Idea*, *PhpStorm* or *WebStorm* etc. which will provide you better suggestions for autocomplete.

**Peer Dependencies**

- `angular`
- `lodash`

**Installation with npm or yarn**

1. `npm install lightgallery ng-lightgallery` or `yarn add lightgallery ng-lightgallery`

**Installation with bower**

1. `bower install ng-lightgallery`

**Usage without Webpack**

```html
<html ng-app="app">
    <head>
        <link rel="stylesheet" href="path/to/lightgallery.css"/>
        <script src="path/to/angular.js"></script>
        <script src="path/to/lodash.js"></script>
        <script src="path/to/lightgallery-all.js"></script>
        <script src="path/to/ng-lightgallery.js"></script>
    </head>
    <body ng-controller="demo">
        <img view-image="{images: images, current: image}" width="200" ng-repeat="image in images" ng-src="{{image.url}}">
        
        <button ng-click="open($event)">Click to open mannually</button>
        
    </body>
    <script>
    	angular.module("app", [
       		 'ngLightgallery'
        ]).controller("demo", [
            '$scope',
            '$lightGallery',
            '$photoswipe',
            function($scope, $lightGallery){

                //Images array for lightgallery
                $scope.images = [
                    {
                        url: "https://farm3.staticflickr.com/2567/5697107145_3c27ff3cd1_m.jpg",
                    },
                    {
                        url: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_m.jpg",
                    },
                ]

                //To trigger lighgallery mannually
                $scope.open = e => $lightGallery.open({
                    targetEvent: e,
                    images: $scope.images
                })
            }
    ])
    </script>
</html>
```

**Usage with Webpack**

```javascript
import "script-loader!lightgallery"
import "script-loader!angular"
import ngLightgallery from "ng-lightgallery"

angular

    .module("app", [
    	ngLightgallery
	])

	.controller("demo", [
            '$scope',
            '$lightGallery',
            '$photoswipe',
            ($scope, $lightGallery)=>{

                //Images array for lightgallery
                $scope.images = [
                    {
                        url: "https://farm3.staticflickr.com/2567/5697107145_3c27ff3cd1_m.jpg",
                    },
                    {
                        url: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_m.jpg",
                    },
                ]

                //To trigger lighgallery mannually
                $scope.open = e => $lightGallery.open({
                    targetEvent: e,
                    images: $scope.images
                })
            }
    ])

```