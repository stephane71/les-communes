import * as React from "react";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import { APP_NAME } from "../src/enums";

const exemples = [
  { title: "Lyon", county: "rhone", slug: "lyon" },
  { title: "Paris", county: "paris", slug: "paris" },
  { title: "Saint-Yan", county: "saone-et-loire", slug: "saint-yan" },
  { title: "Moroges", county: "saone-et-loire", slug: "moroges" },
  { title: "Charolles", county: "saone-et-loire", slug: "charolles" },
];

const AppNameSpan = () => {
  const theme = useTheme();
  return (
    <Typography
      component="span"
      color={theme.palette.text.secondary}
      fontWeight={theme.typography.fontWeightBold}
    >
      {APP_NAME}
    </Typography>
  );
};

export default function Index() {
  const router = useRouter();
  const theme = useTheme();

  function handleClickCityItem(county, slug) {
    return () => {
      router.push(`/${county}/${slug}`);
    };
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        fontWeight={theme.typography.fontWeightBold}
        color={theme.palette.info.dark}
      >
        Les informations essentielles de votre commune
      </Typography>

      <Typography
        variant="p"
        gutterBottom
        color={theme.palette.text.secondary}
      >
        <AppNameSpan /> met à disposition une page dédiée pour chaque commune
        française. Retrouvez le code postal, la population et la carte de votre
        commune.
      </Typography>

      <div>
        <List>
          {exemples.map(({ title, county, slug }) => (
            <ListItem
              key={slug}
              button
              onClick={handleClickCityItem(county, slug)}
            >
              <ListItemText primary={title} />
              <Link>
                {county}/{slug}
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
}
