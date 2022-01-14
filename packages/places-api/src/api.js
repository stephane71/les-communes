import { ApiAuthorizationType } from "@serverless-stack/resources";
import { TABLE_NAME } from "./table";

export const API_NAME = "PlacesApi";

const API = {
  defaultAuthorizationType: ApiAuthorizationType.AWS_IAM,
  defaultFunctionProps: {
    environment: { TABLE_NAME },
  },
  routes: {
    "GET /{county}/{slug}": "src/get/lambda.handler",
    "PUT /{county}/{slug}": "src/put/lambda.handler",
  },
};

export default API;
