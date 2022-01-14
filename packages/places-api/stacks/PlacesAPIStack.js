import * as sst from "@serverless-stack/resources";
import Table, { TABLE_NAME } from "../src/table";
import Api, { API_NAME } from "../src/api";

export default class PlacesAPIStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const table = new sst.Table(this, TABLE_NAME, Table);
    const api = new sst.Api(this, API_NAME, Api);

    api.attachPermissions([table]);

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}
