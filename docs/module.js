import {
  YAML
} from "https://code4sabae.github.io/js/YAML.js";
import {
  TOML
} from "https://taisukef.github.io/toml-es/TOML.js";
import {
  CSV
} from "https://code4sabae.github.io/js/CSV.js";
import {
  showMap
} from "./storytelling.js";
import {
  fetchTsv
} from "./fetchtsv.js";
import {
  Geo3x3
} from "https://taisukef.github.io/Geo3x3/Geo3x3.mjs";

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
const PITCH = 60.0;

const createChapters = (chapters, defaultZoom) => {
  const makeLocation = (chapter, defaultZoom) => {
    if (chapter.hash) {
      const r = chapter.hash.split('/');
      return {
        zoom: r[0],
        center: [
          r[2],
          r[1]
        ],
        bearing: r[3] || 0,
        pitch: r[4] || PITCH
      };
    } else if (chapter.lat && chapter.lng) {
      return {
        zoom: chapter.zoom || defaultZoom,
        center: [chapter.lng, chapter.lat],
        bearing: chapter.bearing || 0,
        pitch: chapter.pitch || PITCH
      };
    } else if (chapter.geo3x3) {
      const pos = Geo3x3.decode(chapter.geo3x3);
      return {
        zoom: chapter.zoom || defaultZoom,
        center: [pos.lng, pos.lat],
        bearing: chapter.bearing || 0,
        pitch: chapter.pitch || PITCH
      };
    }
    return null;
  };
  let n = 0;
  return chapters.map((chapter) => {
    n += 1;
    chapter.id = `chapter-${n}`;
    if (!chapter.alignment) {
      chapter.alignment = ALIGNMENT;
    }
    chapter.callback = null;
    chapter.hidden = false;
    chapter.mapAnimation = 'flyTo';
    chapter.rotateAnimation = ROTATE;
    chapter.onChapterEnter = [];
    chapter.onChapterExit = [];
    chapter.location = makeLocation(chapter, defaultZoom);
    return chapter;
  });
}

const process = async (config) => {
  return new Promise(async (resolve) => {
    config.theme = 'light';
    config.showMarkers = false;
    const urlParams = new URLSearchParams(window.location.search);
    if (config.allowExternalSotry && urlParams.has('story')) {
      config.chapters = window.location.search.split('story=')[1]
      // specify map title
      if (urlParams.has('title')) {
        config.title = urlParams.get('title')
      }
      // specify default zoom level
      if (urlParams.has('zoom')) {
        config.defaultZoom = parseInt(urlParams.get('zoom'))
      }
    }
    // load data from another file
    if (typeof config.chapters === 'string') {
      const url = config.chapters;
      if (url.endsWith('.tsv') || url.endsWith('output=tsv')) {
        config.chapters = await fetchTsv(url);
      } else if (url.endsWith(".yml")) {
        const yml = await (await fetch(url)).text();
        config.chapters = YAML.parse(yml);
      } else if (url.endsWith(".toml")) {
        const yml = await (await fetch(url)).text();
        config.chapters = TOML.parse(yml);
      } else if (url.endsWith(".csv")) {
        const csv = await CSV.fetch(url);
        config.chapters = CSV.toJSON(csv);
      }
    }
    config.chapters = createChapters(config.chapters, config.defaultZoom || 10);
    resolve(config)
  });
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
const main = async () => {
  const yml = getYAML();
  if (!yml) {
    alert("error: not found YAML");
  } else {
    const config = await process(YAML.parse(yml));
    if (typeof mapboxgl !== 'undefined' && typeof scrollama !== 'undefined') {
      showMap(config);
    } else {
      window.onload = () => {
        showMap(config);
      }
    }
  }
};
main();