// import { TABLE_NAME, TABLE_REGION } from "./table";

export const API_NAME = "PlacesApi";

const API = {
  defaultFunctionProps: {
    environment: { TABLE_NAME: "PlacesTableFr", TABLE_REGION: "eu-west-3" },
  },
  routes: {
    "GET /{county}/{slug}": {
      function: {
        handler: "src/get/lambda.handler",
      },
      methodOptions: {
        apiKeyRequired: true,
      },
    },
  },
};

export default API;
