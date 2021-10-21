/**
 * Get the JSON+LD data structure for a city
 * Source : https://schema.org/City
 * @param url
 * @param city
 *
 * @return cityJsonLd
 **/
export default function getCityJsonLD(url, city) {
  return {
    "@context": "https://schema.org",
    "@type": "City",
    name: city.name,
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "France",
      latitude: city.location[0],
      longitude: city.location[1],
    },
    url,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "City Code",
      value: city.code,
    },
    // Possible attributes
    // description: '<Récupérer la description sur Wikipédia>'
    // hasMap: "Google Maps static map"
    // sameAs: wikipedia page
    // logo: url,
    // image: url
    // photo: url
  };
}
