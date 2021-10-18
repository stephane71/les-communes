import { BillingMode, ProjectionType } from "@aws-cdk/aws-dynamodb";
import DEFINITIONS from "./definitions";

const { TABLE, GLOBAL_SECONDARY_INDEXES_DEFINITION, ATTRIBUTES_DEFINITION } =
  DEFINITIONS;

const PROPERTIES = {
  TableName: TABLE.NAME,
  BillingMode: BillingMode.PAY_PER_REQUEST,
  AttributeDefinitions: ATTRIBUTES_DEFINITION.map(({ name, type }) => ({
    AttributeName: name,
    AttributeType: type,
  })),
  KeySchema: [
    {
      AttributeName: TABLE.HASH_KEY,
      KeyType: "HASH",
    },
    {
      AttributeName: TABLE.RANGE_KEY,
      KeyType: "RANGE",
    },
  ],
  GlobalSecondaryIndexes: GLOBAL_SECONDARY_INDEXES_DEFINITION.map(
    ({ name, hashKey, rangeKey }) => ({
      IndexName: name,
      Projection: {
        ProjectionType: ProjectionType.ALL,
      },
      KeySchema: [
        {
          AttributeName: hashKey,
          KeyType: "HASH",
        },
        {
          AttributeName: rangeKey,
          KeyType: "RANGE",
        },
      ],
    })
  ),
};

export default PROPERTIES;
