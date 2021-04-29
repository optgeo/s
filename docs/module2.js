import { YAML } from "https://js.sabae.cc/YAML.js";
import {} from "./module.js";

const addStyleSheet = (href) => {
  const link = document.createElement("link");
  link.href = href;
  link.rel = "stylesheet";
  document.head.appendChild(link);
};
const addScript = (src) => {
  const sc = document.createElement("script");
  sc.src = src;
  document.head.appendChild(sc);
};
const init = () => {
  addStyleSheet("https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css");
  addStyleSheet("https://optgeo.github.io/s/style.css");
  addScript("https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js");
  addScript("https://unpkg.com/intersection-observer@0.5.1/intersection-observer.js");
  addScript("https://unpkg.com/scrollama");

  const map = document.createElement("div");
  map.id = "map";
  document.body.appendChild(map);
  
  const story = document.createElement("div");
  story.id = "story";
  document.body.appendChild(story);
};
init();

const ALIGNMENT = 'right';
const ROTATE = true;

const process = (config) => {
  // config.accessToken = TOKEN;
  config.theme = 'light';
  config.showMarkers = false;
  let n = 0;
  config.chapters.forEach((chapter) => {
    n += 1;
    chapter.id = `chapter-${n}`;
    chapter.alignment = ALIGNMENT;
    chapter.callback = null;
    chapter.hidden = false;
    chapter.mapAnimation = 'flyTo';
    chapter.rotateAnimation = ROTATE;
    chapter.onChapterEnter = [];
    chapter.onChapterExit = [];
    const r = chapter.hash.split('/');
    console.log(n, r);
    chapter.location = {
      zoom: r[0],
      center: [
        r[2],
        r[1]
      ],
      bearing: r[3],
      pitch: r[4]
    };
  });
  return config;
};

const getYAML = () => {
  const sc = document.querySelectorAll("script");
  for (const s of sc) {
    if (s.type == "text/yaml") {
      return s.textContent;
    }
  }
  return null;
};
const yml = getYAML();
if (!yml) {
  alert("error: not found YAML");
} else {
  window.config = process(YAML.parse(yml));
}
