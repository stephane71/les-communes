import { TABLE_NAME } from "./table";

export const API_NAME = "PlacesApi";

const API = {
  defaultFunctionProps: {
    environment: { TABLE_NAME },
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
