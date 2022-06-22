import fs from "fs";
import YAML from "json-to-pretty-yaml";
import Properties from "../table/properties.mjs";

const properties = YAML.stringify(Properties);
fs.writeFileSync("table/properties.yml", properties);
