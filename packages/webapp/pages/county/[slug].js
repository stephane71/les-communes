import PLacesSDK from "@les-communes/places-sdk";

const placesSDK = new PLacesSDK();

const Department = ({ department }) => {
  const { name, regionCode } = department;

  return (
    <div>
      <h1>{name}</h1>
      <h2>{regionCode}</h2>
    </div>
  );
};

export default Department;

export async function getServerSideProps({ params }) {
  const { slug } = params;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  let department = null;

  try {
    department = await placesSDK.getCounty(slug);
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
      department,
    },
  };
}
