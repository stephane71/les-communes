import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import AppBarMui from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LinkMui from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ColorModeContext from "../../contexts/ColorModeContext";
import { APP_NAME } from "../../src/enums";

const IconButtonDarkMode = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

function AppBar() {
  const theme = useTheme();

  return (
    <AppBarMui
      position="static"
      color="transparent"
      variant="outlined"
      elevation={0}
      sx={{
        border: 0,
        borderBottom: 1,
        borderColor: "grey.300",
        color: theme.palette.text.secondary,
      }}
    >
      <Toolbar>
        <Link href="/" passHref>
          <LinkMui
            underline="none"
            color={theme.palette.text.secondary}
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            {APP_NAME}
          </LinkMui>
        </Link>
        <IconButtonDarkMode />
      </Toolbar>
    </AppBarMui>
  );
}

export default AppBar;
