import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Stack from "@mui/material/Stack";
import CopyButton from "../CopyButton";

const Title = ({ name }) => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        {name}
      </Typography>
    </div>
  );
};

function CityHeader({ name }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Title name={name} />
      <CopyButton text={name} icon={ContentCopyIcon} />
    </Stack>
  );
}

export default CityHeader;
