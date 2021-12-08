import * as React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

const exemples = [
  { title: "Lyon", county: "rhone", slug: "lyon" },
  { title: "Paris", county: "paris", slug: "paris" },
  { title: "Saint-Yan", county: "saone-et-loire", slug: "saint-yan" },
  { title: "Moroges", county: "saone-et-loire", slug: "moroges" },
  { title: "Charolles", county: "saone-et-loire", slug: "charolles" },
];

export default function Index() {
  const router = useRouter();

  function handleClickCityItem(county, slug) {
    return () => {
      router.push(`/${county}/${slug}`);
    };
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Les Communes
        </Typography>
      </Box>
      <Box>
        <List>
          {exemples.map(({ title, county, slug }) => (
            <ListItem key={slug} button onClick={handleClickCityItem(county, slug)}>
              <ListItemText primary={title} />
              <Link>{county}/{slug}</Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
