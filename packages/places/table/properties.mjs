import {BillingMode, ProjectionType} from "@aws-cdk/aws-dynamodb";
import DEFINITIONS from "./definitions.mjs";

const {TABLE, GLOBAL_SECONDARY_INDEXES_DEFINITION, ATTRIBUTES_DEFINITION} =
    DEFINITIONS;

const Properties = {
    TableName: TABLE.NAME,
    BillingMode: BillingMode.PAY_PER_REQUEST,
    AttributeDefinitions: Array.from(ATTRIBUTES_DEFINITION.values()).map(({name, type}) => ({
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
    GlobalSecondaryIndexes: Array.from(GLOBAL_SECONDARY_INDEXES_DEFINITION.values()).map(
        ({name, hashKey, rangeKey}) => ({
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

export default Properties;
