import { TableFieldType } from "@serverless-stack/resources";

export const TABLE_NAME = "PlacesTable";

// ATTRIBUTES
const SLUG = "slug";
const COUNTY = "county";
const TYPE = "type";
const GEOHASH = "geohash";
const CODE = "code";
const POPULATION = "population";

// GLOBAL SECONDARY INDEXES
const COUNTY_TYPE_GSI = "CountyTypeGSI";
const GEOHASH_TYPE_GSI = "GeohashTypeGSI";
const CODE_TYPE_GSI = "CodeTypeGSI";
const TYPE_POPULATION_GSI = "TypePopulationGSI";

const TABLE = {
  fields: {
    [SLUG]: TableFieldType.STRING,
    [COUNTY]: TableFieldType.STRING,
    [TYPE]: TableFieldType.STRING,
    [GEOHASH]: TableFieldType.STRING,
    [CODE]: TableFieldType.STRING,
    [POPULATION]: TableFieldType.NUMBER,
  },
  primaryIndex: {
    partitionKey: SLUG,
    sortKey: COUNTY,
  },
  globalIndexes: {
    [COUNTY_TYPE_GSI]: { partitionKey: COUNTY, sortKey: TYPE },
    [GEOHASH_TYPE_GSI]: { partitionKey: GEOHASH, sortKey: TYPE },
    [CODE_TYPE_GSI]: { partitionKey: CODE, sortKey: TYPE },
    [TYPE_POPULATION_GSI]: { partitionKey: TYPE, sortKey: POPULATION },
  },
};

export default TABLE;
