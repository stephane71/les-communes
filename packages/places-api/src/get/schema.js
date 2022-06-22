const pathParameters = {
  type: "object",
  required: ["county", "slug"],
  properties: {
    county: { type: "string" },
    slug: { type: "string" },
  },
};

const schema = {
  type: "object",
  required: ["pathParameters"],
  properties: {
    pathParameters,
  },
};

export default schema;
