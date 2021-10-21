import PLacesSDK from "@les-communes/places-sdk";

const placesSDK = new PLacesSDK();

const City = ({ city, department }) => {
  const { name, population, location, code, postalCodes } = city;

  return (
    <div>
      <h1>{name}</h1>
      <h2>{department.name}</h2>
      <div>
        <div>Population : {population}</div>
        <div>Code commune : {code}</div>
        <div>Code Postaux : {postalCodes.join(",")}</div>
        <div>Coordonnées : {JSON.stringify(location)}</div>
      </div>
    </div>
  );
};

export default City;

export async function getServerSideProps({ params }) {
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
    },
  };
}
