import fetch from "node-fetch";
import * as fs from "fs";

const GEO_API_GOV_URL = "https://geo.api.gouv.fr/communes";
const CURRENT_CITY_LIST_PATH = "./scripts/geo-api-gov.json";

async function getAllCities(refresh) {
  console.log("-- getAllCities --");
  if (refresh || !fs.existsSync(CURRENT_CITY_LIST_PATH)) {
    console.log("No file found => fetch list from Geo API GOV");
    const res = await fetch(GEO_API_GOV_URL);
    const data = await res.json();
    fs.writeFileSync(CURRENT_CITY_LIST_PATH, JSON.stringify(data));
  }

  const data = fs.readFileSync(CURRENT_CITY_LIST_PATH, "utf8");
  const cities = JSON.parse(data);
  console.log("return", cities.length, "cities");
  return cities;
}

export default getAllCities;
