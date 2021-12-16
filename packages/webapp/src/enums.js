export const APP_NAME = "Une Commune";

export const SEO = {
  HOME: {
    title: `${APP_NAME} | Retrouvez les informations sur votre commune`,
    description:
      `${APP_NAME} met à disposition les informations indispensables de votre communes : population, coordonnées, code postal`,
  },
  CITY: {
    title: (strings, commune) => `${APP_NAME} | ${commune}`,
    description: (strings, commune) =>
        `Retrouvez toutes les informations sur la commune de ${commune}`,
  }
};
