import PlacesAPIStack from "./PlacesAPIStack";

export default function main(app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  new PlacesAPIStack(app, "crud-stack");
}
