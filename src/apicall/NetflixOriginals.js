import axios from "axios";

let genreMap = {};

const loadGenres = async (apiKey) => {
  if (Object.keys(genreMap).length === 0) {
    const response = await axios.get(
      `https://api.watchmode.com/v1/genres/?apiKey=${apiKey}`
    );
    response.data.forEach((g) => {
      genreMap[g.id] = g.name;
    });
  }
};

export const NetflixOriginals = async (apiKey) => {
  try {
    await loadGenres(apiKey);

    const response = await axios.get(
      `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&source_ids=203&sort_by=popularity_desc&limit=10`,
      { timeout: 5000 }
    );

    const originalsData = response.data.titles || [];

    const detailedTitles = await Promise.all(
      originalsData.map(async (item) => {
        try {
          const details = await axios.get(
            `https://api.watchmode.com/v1/title/${item.id}/details/?apiKey=${apiKey}`
          );

          const trailerUrl =
            details.data.trailer || details.data.trailer_url || null;

        return {
        id: item.id,
        title: item.title,
        year: item.year,
        poster: details.data.poster,
        synopsis: details.data.plot_overview,
        cast: details.data.cast || [],
        runtime: details.data.runtime,
        genres: details.data.genre_ids?.map((id) => genreMap[id]) || [],
        ageRating:details.data.us_rating || details.data.us_certification || "N/A",
        trailer: trailerUrl,
      };    

        } catch (error) {
          console.log("details error:", error.message);
          return {
            id: item.id,
            title: item.title,
          };
        }
      })
    );

    return detailedTitles;
  } catch (error) {
    console.log("netflix originals error:", error.message);
    return [];
  }
};