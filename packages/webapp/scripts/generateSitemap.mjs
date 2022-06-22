import { createWriteStream } from "fs";
import { SitemapStream } from "sitemap";
import slug from "slug";
import getAllCities from "./getAllCities.mjs";
import getAllDepartments from "./getAllDepartments.mjs";

const HOSTNAME = "https://www.une-commune.com";

function getDateToday() {
  const date = new Date();
  return date.toISOString().split("T")[0];
}

/**
 * createCitiesSitemap
 * @returns {Promise<void>}
 *
 * Can it be done by an AWS Lambda && run through an endpoint ?
 */

async function createCitiesSitemap() {
  console.log("-- createCitiesSitemap --");
  const cities = await getAllCities();
  const departments = await getAllDepartments();
  console.log(cities.length, "cities && ", departments.length, "departments");

  const writeStream = createWriteStream("./public/sitemap.xml");
  const sitemap = new SitemapStream({ hostname: HOSTNAME });

  sitemap.pipe(writeStream);

  sitemap.write({
    url: `/`,
    changefreq: "yearly",
    lastmod: getDateToday(),
  });

  cities.forEach(({ nom, codeDepartement }) => {
    const dep = departments.find(({ code }) => code === codeDepartement);
    if (!dep) {
      console.log("NO DEPARTMENT FOUND for", nom, codeDepartement);
      return;
    }

    sitemap.write({
      url: `/${dep.slug}/${slug(nom, { lower: true })}`,
      changefreq: "yearly",
      lastmod: getDateToday(),
    });
  });
  sitemap.end();
}

createCitiesSitemap().then(() => {
  console.log("End sitemap generation");
});
