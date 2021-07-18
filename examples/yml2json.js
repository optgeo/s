import { YAML } from "https://js.sabae.cc/YAML.js";

const d = YAML.parse(await Deno.readTextFile("test.yml"));
const s = JSON.stringify(d);
console.log(s);
await Deno.writeTextFile("test.json", s);

