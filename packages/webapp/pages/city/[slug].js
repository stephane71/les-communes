import PLacesSDK from "@les-communes/places-sdk";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import getCityJsonLD from "../../src/getCityJsonLD";

const placesSDK = new PLacesSDK();

function getFormattedNumber(number) {
  return new Intl.NumberFormat("fr-fr").format(number);
}

function getPrintedPostalCodes(postalCodes) {
  if (postalCodes.length > 3) {
    const start = getFormattedNumber(postalCodes[0]);
    const end = getFormattedNumber(postalCodes.slice(-1)[0]);
    return `${start} à ${end}`;
  }
  return postalCodes.map((cp) => getFormattedNumber(cp)).join(",");
}

function getPrintedLocation(location) {
  const [lat, lng] = location;
  return `${lat}, ${lng}`;
}

const TableContainerPaper = (props) => (
  <Paper
    variant="outlined"
    {...props}
    sx={{
      "&.MuiTableContainer-root": { overflowX: "hidden" },
    }}
  />
);

/**
 *  Things to render
 *  - Prefecture / Sous préfecture
 *  - Superficie
 *  - Gentilé
 *  - Logo && Blason
 */
const City = ({ city, department }) => {
  const { name, population, location, code, postalCodes } = city;

  const rows = [
    { title: "Department", value: department.name },
    { title: "Population", value: getFormattedNumber(population) + " habs" },
    { title: "Coordonnées", value: getPrintedLocation(location) },
    { title: "Code commune", value: getFormattedNumber(code) },
    {
      title: postalCodes.length > 1 ? "Codes Postaux" : "Code postal",
      value: getPrintedPostalCodes(postalCodes),
    },
  ];

  return (
    <Container maxWidth="sm">
      <h1>{name}</h1>

      <TableContainer component={TableContainerPaper}>
        <Table aria-label="city description" sx={{ tableLayout: "fixed" }}>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <Typography color={"text.secondary"} fontWeight={"medium"}>
                    {row.title}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography noWrap>{row.value}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default City;

export async function getServerSideProps({ params, resolvedUrl }) {
  const { slug } = params;
  const [countySlug, citySlug] = slug.split("--");

  if (!countySlug || !citySlug) {
    return {
      notFound: true,
    };
  }

  let city = null;
  let department = null;

  try {
    city = await placesSDK.getCity(countySlug, citySlug);
    department = await placesSDK.getDepartmentFromCode(city.codeDepartment);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return {
          notFound: true,
        };
      } else {
        throw new Error();
      }
    }
  }

  return {
    props: {
      city,
      department,
      jsonLD: getCityJsonLD(resolvedUrl, city),
      resolvedUrl,
    },
  };
}
