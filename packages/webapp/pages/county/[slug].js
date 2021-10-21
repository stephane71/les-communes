import PLacesSDK from "@les-communes/places-sdk";

const placesSDK = new PLacesSDK();

const County = ({ county }) => {
  const { name, code, codeRegion } = county;

  return (
    <div>
      <h1>
        {name} - {code}
      </h1>
      <h2>Region: {codeRegion}</h2>
    </div>
  );
};

export default County;

export async function getServerSideProps({ params }) {
  const { slug } = params;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  let counties = [];

  try {
    counties = await placesSDK.getCounty(slug, "DEPARTMENT");
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

  if (!counties.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      county: counties[0],
    },
  };
}
