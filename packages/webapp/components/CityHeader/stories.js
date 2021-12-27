import React from "react";
import CityHeader from "./index";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "CityHeader",
  component: CityHeader,
};

export const Primary = () => (
  <CityHeader
    name="Name-of-the-city"
    postalCodes="71390"
    url="url/de/la/commune"
  />
);
