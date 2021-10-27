import { createWriteStream } from "fs";
import { SitemapStream } from "sitemap";
import slug from "slug";
import getAllCities from "./getAllCities.mjs";

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
  const cities = await getAllCities();
  console.log(cities.length, "cities");

  const writeStream = createWriteStream("./public/sitemap.xml");
  const sitemap = new SitemapStream({ hostname: HOSTNAME });

  sitemap.pipe(writeStream);
  cities.forEach(({ nom }) => {
    sitemap.write({
      url: `/${slug(nom, { lower: true })}`,
      changefreq: "yearly",
      lastmod: getDateToday(),
    });
  });
  sitemap.end();
}

createCitiesSitemap().then(() => {
  console.log("End sitemap generation");
});
