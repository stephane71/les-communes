import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
// import AWS from "aws-sdk";
import createError from "http-errors";
import inputSchema from "./schema";
// import Table from "../table";

// const client = new AWS.DynamoDB.DocumentClient({
//   region: process.env.TABLE_REGION,
// });
// const { sortKey, partitionKey } = Table.primaryIndex;

async function get(event) {
  const { slug, county } = event.pathParameters;

  // const command = {
  //   TableName: process.env.TABLE_NAME,
  //   Key: {
  //     [partitionKey]: slug,
  //     [sortKey]: county,
  //   },
  // };
  //
  // const response = await client.get(command).promise();
  // const place = response.Item;

  const place = { city: "test de rep", slug, county };

  if (!place) {
    throw new createError.NotFound();
  }

  return {
    statusCode: 200,
    body: JSON.stringify(place),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

export const handler = middy(get)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
