import { process, showMap } from "./system.js";

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
