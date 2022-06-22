import Head from "next/head";
import PLacesSDK from "@les-communes/places-sdk";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CityHeader from "../../../components/CityHeader";
import getCityJsonLD from "../../../src/getCityJsonLD";
import JsonLD from "../../../components/JsonLD";
import { SEO } from "../../../src/enums";

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

/**
 *  Things to render
 *  - Prefecture / Sous préfecture
 *  - Superficie
 *  - Gentilé
 *  - Logo && Blason
 */
const City = ({ city, jsonLD }) => {
  const { name, population, location, code, postalCodes } = city;

  const rows = [
    { title: "Population", value: getFormattedNumber(population) + " habs" },
    { title: "Coordonnées", value: getPrintedLocation(location) },
    { title: "Code commune", value: getFormattedNumber(code) },
    {
      title: postalCodes.length > 1 ? "Codes Postaux" : "Code postal",
      value: getPrintedPostalCodes(postalCodes),
    },
  ];

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Head>
        <title>{SEO.CITY.title`${name}`}</title>
        <meta name="description" content={SEO.CITY.description`${name}`} />
      </Head>

      <CityHeader name={name} url={jsonLD.url} />

      <TableContainer component={TableContainerPaper}>
        <Table aria-label="city description" sx={{ tableLayout: "fixed" }}>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <JsonLD data={jsonLD} />
    </Container>
  );
};

export default City;

export async function getServerSideProps({ params, resolvedUrl }) {
  const { slug, county } = params;
  const citySlug = slug;
  const countySlug = county;

  if (!countySlug || !citySlug) {
    return {
      notFound: true,
    };
  }

  let city = null;

  try {
    city = await placesSDK.getCity(countySlug, citySlug);
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
      jsonLD: getCityJsonLD(resolvedUrl, city),
      resolvedUrl,
    },
  };
}
