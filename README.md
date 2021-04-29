# s
a storytelling helper

# Purpose
The aim of this repository is to make `index.html` of mapbox/storytelling app simple as below.

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

# Thanks
- https://github.com/mapbox/storytelling
- @taisukef

# Demo
- https://optgeo.github.io/b3ps5
