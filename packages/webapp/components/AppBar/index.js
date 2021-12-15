import Link from "next/link";
import AppBarMui from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LinkMui from "@mui/material/Link";

function AppBar() {
  return (
    <AppBarMui
      position="static"
      color="transparent"
      variant="outlined"
      elevation={0}
      sx={{ border: 0, borderBottom: 1, borderColor: "grey.300" }}
    >
      <Toolbar>
        <Link href="/" passHref>
          <LinkMui
            underline="none"
            color="text.primary"
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Les Communes
          </LinkMui>
        </Link>
      </Toolbar>
    </AppBarMui>
  );
}

export default AppBar;
