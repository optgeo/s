# s: 地図語り

a storytelling helper

## Purpose

The aim of this repository is to make `index.html` of mapbox/storytelling app simple as below.

## Config

You need to specify story parameters by adding `<script "type=yaml">` tag in your HTML.

| Name               | Mandatory | Type            | Description                                                                                                                                                                 | Sample value                            |
| ------------------ | --------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| accessToken        | yes       | string          | MapBox access token. You need to set your own token that can be retrieved from [MapBox](https://www.mapbox.com/)                                                            | pk.eyJ1I.....rTx380smyvPc1g             |
| title              | yes       | string          | Title of the map                                                                                                                                                            | 中国地方の自然と産業                    |
| style              | yes       | string          | Location of a style JSON of MapBox                                                                                                                                          | https://optgeo.github.io/b3p/style.json |
| allowExternalSotry | no        | boolean         | Set `true` if viewers can change data by adding URL parameters                                                                                                              | true                                    |
| defaultZoom        | no        | integer         | Default zoom level that is used when chapters doesn't has zoom level                                                                                                        | 19                                      |
| chapters           | yes       | string or array | If string data is set, system will load specified data location. If array data is set, system will use the data as chapter data. Please see `Chapters` section for details. | https://optgeo.github.io/s/hoge.csv     |
| footer             | yes       | string          | HTML strings That will be shown in the page footer                                                                                                                          | Copyright: Optgeo                       |

### Chapters

Chapters are array of location data of stories.  
Curently, you can specify below parameters.

| Name               | explanation                         |
| ------------------ | ----------------------------------- |
| title              | title of the location               |
| description        | data description                    |
| hash               | `zoom/lat/lng/bearing/pitch` format |
| lat,lng            | lat, lng location                   |
| chapter.geo3x3     | geo3x3 formatted location           |
| zoom: chapter.zoom | zoom level                          |
| bearing            | bearing                             |
| pitch              | pitch                               |

## Examples

### Add YAML data into html file directly.

```html
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title></title>
<script type="module" src="https://optgeo.github.io/s/module.js"></script>
</head>
<body>
<script type="text/yaml">
accessToken: pk.eyJ1IjoiaGZ1IiwiYSI6ImlRSGJVUTAifQ.rTx380smyvPc1gUfZv1cmw
title: 中国地方の自然と産業
style: https://optgeo.github.io/b3p/style.json
chapters:
  -
    title: 岡山平野
    description: 岡山県にある平野です。
    hash: 11.19/34.5801/133.8456/63.2/59
  -
    title: 鳥取砂丘
    description: 鳥取県にある砂丘です。
    hash: 14.9/35.54016/134.22845/153.6/0
footer: >-
  <p>このプロジェクトは、
  <a href='https://github.com/optgeo'>Adopt Geodata プロジェクト</a>の一環です。</p>
</script>
</body>
</html>
```

[Example](examples/index.html)

### Import data from Google Spreadsheet

Please create google spreadsheet and publish it as a `tsv` format data by using `File -> Publish to the web`
The spreadsheet should have `title`, `description` and `hash` columns.
[Example Spreadsheet](https://docs.google.com/spreadsheets/d/1Kt2ZjySNaNfeeiMPLjto1nvH7ue4BoQfuxtZ5c4oZV0/edit#gid=0)

<img src="examples/images/publish.png" width="300"/>

Then specify the published URL to the `chapters` property on the HTML file.

```html
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title></title>
<script type="module" src="https://optgeo.github.io/s/module.js"></script>
</head>
<body>
<script type="text/yaml">
accessToken: pk.eyJ1IjoiaGZ1IiwiYSI6ImlRSGJVUTAifQ.rTx380smyvPc1gUfZv1cmw
title: 中国地方の自然と産業
style: https://optgeo.github.io/b3p/style.json
chapters: https://docs.google.com/spreadsheets/d/e/2PACX-1vTBcPmZNrFN8WRg76eKJXwnNQDFh-G0sG2OcwJ00hW1DxNKgxZnGAlYzZoiZJktiCB1Zr1wrxJiqbjU/pub?output=tsv
footer: >-
  <p>このプロジェクトは、
  <a href='https://github.com/optgeo'>Adopt Geodata プロジェクト</a>の一環です。</p>
</script>
</body>
</html>
```

[Example](examples/spreadsheet.html) or [Demo](https://optgeo.github.io/b3ps7/)

### Import data from CSV file

Please create CSV file

[Example CSV](examples/test.csv)

```html
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title></title>
<script type="module" src="https://optgeo.github.io/s/module.js"></script>
</head>
<body>
<script type="text/yaml">
accessToken: pk.eyJ1IjoiaGZ1IiwiYSI6ImlRSGJVUTAifQ.rTx380smyvPc1gUfZv1cmw
title: 中国地方の自然と産業
style: https://optgeo.github.io/b3p/style.json
chapters: ./test.csv
footer: >-
  <p>このプロジェクトは、
  <a href='https://github.com/optgeo'>Adopt Geodata プロジェクト</a>の一環です。</p>
</script>
</body>
</html>
```

[Example](examples/csv.html)

### Import data from YAML file

Please create YAML file

[Example YAML](examples/test.yml)

```html
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title></title>
<script type="module" src="https://optgeo.github.io/s/module.js"></script>
</head>
<body>
<script type="text/yaml">
accessToken: pk.eyJ1IjoiaGZ1IiwiYSI6ImlRSGJVUTAifQ.rTx380smyvPc1gUfZv1cmw
title: 中国地方の自然と産業
style: https://optgeo.github.io/b3p/style.json
chapters: ./test.yml
footer: >-
  <p>このプロジェクトは、
  <a href='https://github.com/optgeo'>Adopt Geodata プロジェクト</a>の一環です。</p>
</script>
</body>
</html>
```

[Example](examples/yml.html)

### Import data from remote URI

Please add `allowExternalSotry: true` to the YAML config.

[Example CSV](examples/remotedata.csv)

You can read story data by adding a `story` parameter.
The system will read the data using all parameters after the `story=` occurred.  
Also, you can set a map title by a `title` parameter.

```html
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title></title>
<script type="module" src="https://optgeo.github.io/s/module.js"></script>
</head>
<body>
<script type="text/yaml">
accessToken: pk.eyJ1IjoiaGZ1IiwiYSI6ImlRSGJVUTAifQ.rTx380smyvPc1gUfZv1cmw
title: 中国地方の自然と産業
style: https://optgeo.github.io/b3p/style.json
allowExternalSotry: true
defaultZoom: 19
chapters: ./test.yml
footer: >-
  <p>このプロジェクトは、
  <a href='https://github.com/optgeo'>Adopt Geodata プロジェクト</a>の一環です。</p>
</script>
</body>
</html>
```

Example  
[http://optgeo.github.io/s/examples/geturl.html?title=文化財&story=https://raw.githubusercontent.com/optgeo/s/main/examples/remotedata.csv](http://optgeo.github.io/s/examples/geturl.html?title=文化財&story=https://raw.githubusercontent.com/optgeo/s/main/examples/remotedata.csv)

## Thanks

- https://github.com/mapbox/storytelling
- @taisukef
- @halsk

## Demo

- https://optgeo.github.io/s/
