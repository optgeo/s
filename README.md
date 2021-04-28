# s
a storytelling helper

# Purpose
The aim of this repository is to make `index.html` of mapbox/storytelling app simple as below.

```html
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8' />
<title></title>
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
<link href='https://optgeo.github.io/s/style.css' rel='stylesheet' />
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js'></script>
<script src="https://unpkg.com/intersection-observer@0.5.1/intersection-observer.js"></script>
<script src="https://unpkg.com/scrollama"></script>
</head>
<body>
<div id="map"></div>
<div id="story"></div>
<script src="./config.js"></script>
<script src="https://optgeo.github.io/s/module.js" type="module"></script>
</body>
</html>

```

# Thanks
- https://github.com/mapbox/storytelling
