import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import CopyButton from "../CopyButton";

const Title = ({ name, postalCodes }) => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        {name}
      </Typography>
      <Typography variant="p" gutterBottom>
        {postalCodes}
      </Typography>
    </div>
  );
};

function CityHeader({ name, postalCodes, url }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <Title name={name} postalCodes={postalCodes} />
      <CopyButton text={url} icon={ContentCopyIcon} />
    </Box>
  );
}

export default CityHeader;
