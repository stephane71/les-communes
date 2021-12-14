import fs from "fs";
import fetch from "node-fetch";

const PLACES_API_DEPARTMENTS =
  "https://nskcrq0b2m.execute-api.eu-west-3.amazonaws.com/dev/departments";
const CURRENT_DEPARTMENT_LIST_PATH = "./scripts/places-api-departments.json";

async function getAllDepartments(refresh) {
  console.log("-- getAllDepartments --");
  if (refresh || !fs.existsSync(CURRENT_DEPARTMENT_LIST_PATH)) {
    console.log("No file found => fetch list from LES COMMUNES PLACES API");
    const res = await fetch(PLACES_API_DEPARTMENTS);
    const data = await res.json();
    fs.writeFileSync(CURRENT_DEPARTMENT_LIST_PATH, JSON.stringify(data));
  }

  const data = fs.readFileSync(CURRENT_DEPARTMENT_LIST_PATH, "utf8");
  const departments = JSON.parse(data);
  console.log("return", departments.length, "departments");
  return departments;
}

export default getAllDepartments;
