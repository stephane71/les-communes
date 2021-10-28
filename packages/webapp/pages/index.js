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
  { title: "Lyon", slug: "rhone--lyon" },
  { title: "Paris", slug: "paris--paris" },
  { title: "Saint-Yan", slug: "saone-et-loire--saint-yan" },
  { title: "Moroges", slug: "saone-et-loire--moroges" },
  { title: "Charolles", slug: "saone-et-loire--charolles" },
];

export default function Index() {
  const router = useRouter();

  function handleClickCityItem(slug) {
    return () => {
      router.push(`/${slug}`);
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
          {exemples.map(({ title, slug }) => (
            <ListItem key={slug} button onClick={handleClickCityItem(slug)}>
              <ListItemText primary={title} />
              <Link>{slug}</Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
