import apigClientFactory from "aws-api-gateway-client";

const PLACES_API = {
  url: "https://nskcrq0b2m.execute-api.eu-west-3.amazonaws.com/dev",
  region: "eu-west-3",
};

class PlacesSDK {
  constructor() {
    this.api = apigClientFactory.default.newClient({
      invokeUrl: PLACES_API.url,
      region: PLACES_API.region,
      //apiKey: process.env.PLACES_API_KEY,
    });
  }

  async getCity(countySlug, citySlug) {
    if (!countySlug || !citySlug) {
      return null;
    }

    const res = await this.api.invokeApi(
      { countySlug, citySlug },
      "/{countySlug}/{citySlug}",
      "GET",
      {}
    );
    return res.data;
  }

  async getCounty(slug) {
    if (!slug) {
      return null;
    }

    console.log("getDepartment", slug);

    const res = await this.api.invokeApi({ slug }, "/places/{slug}", "GET", {
      type: "DEPARTMENT",
    });
    return res.data;
  }

  async getDepartmentFromCode(code) {
    if (!code) {
      return null;
    }

    const res = await this.api.invokeApi(
      { code },
      "/departments/{code}",
      "GET",
      {}
    );
    return res.data;
  }
}

export default PlacesSDK;
