export async function handler(event) {
  // const {slug, county} = event.pathParameters;

  return {
    statusCode: 200,
    body: JSON.stringify({ ...event.pathParameters, test: "hello" }),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}
