import PLacesSDK from "@les-communes/places-sdk";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import getCityJsonLD from "../../src/getCityJsonLD";

const placesSDK = new PLacesSDK();

const TableContainerPaper = (props) => <Paper variant="outlined" {...props} />;

/**
 *  Things to render
 *  - Prefecture / Sous préfecture
 *  - Superficie
 */
const City = ({ city, department }) => {
  const { name, population, location, code, postalCodes } = city;

  const rows = [
    { title: "Department", value: department.name },
    { title: "Population", value: population },
    { title: "Coordonnées", value: JSON.stringify(location) },
    { title: "Code commune", value: code },
    { title: "Codes Postaux", value: postalCodes.join(",") },
  ];

  return (
    <Container maxWidth="sm">
      <h1>{name}</h1>

      <TableContainer component={TableContainerPaper}>
        <Table aria-label="city description">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
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
