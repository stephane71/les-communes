import { expect, haveResource } from "@aws-cdk/assert";
import * as sst from "@serverless-stack/resources";
import PlacesAPIStack from "../stacks/PlacesAPIStack";

test("Test Stack", () => {
  const app = new sst.App();
  // WHEN
  const stack = new PlacesAPIStack(app, "test-stack");
  // THEN
  expect(stack).to(haveResource("AWS::Lambda::Function"));
});
