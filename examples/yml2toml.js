import { YAML } from "https://js.sabae.cc/YAML.js";
import { TOML } from "https://js.sabae.cc/TOML.js";

const d = YAML.parse(await Deno.readTextFile("test.yml"));
const s = TOML.stringify(d);
console.log(s);
await Deno.writeTextFile("test.toml", s);

