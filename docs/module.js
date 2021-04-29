import {
  YAML
} from "https://js.sabae.cc/YAML.js";
import {
  showMap
} from "./storytelling.js";
import {
  readGoogleSpreadsheet
} from "./gspreadsheet.js";

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

const createChapters = (chapters) => {
  let n = 0;
  return chapters.map((chapter) => {
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
    chapter.location = {
      zoom: r[0],
      center: [
        r[2],
        r[1]
      ],
      bearing: r[3],
      pitch: r[4]
    };
    return chapter;
  });
}

const process = (config, callback) => {
  // config.accessToken = TOKEN;
  config.theme = 'light';
  config.showMarkers = false;
  if (typeof config.chapters === 'string') {
    if (config.chapters.indexOf('https://docs.google.com/spreadsheets/') === 0) {
      readGoogleSpreadsheet(config.chapters, (chapters) => {
        config.chapters = createChapters(chapters);
        callback(config)
      })
    }
  } else {
    config.chapters = createChapters(config.chapters)
    callback(config);
  }
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
  process(YAML.parse(yml), (config) => {
    window.config = config
    if (typeof (mapboxgl) !== 'undefined') {
      showMap(config);
    } else {
      window.onload = function () {
        showMap(config)
      }
    }
  })
}