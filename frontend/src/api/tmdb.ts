const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_API_KEY;

const headers = {
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

export async function getPopularMovies(page: number = 1) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?page=${page}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

export async function getMovieVideos(movieId: number) {
  const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`TMDB video request failed: ${response.status}`);
  }

  return response.json();
}

export function getBestTrailer(videos: any[]) {
  return (
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.official === true &&
        video.type === "Trailer"
    ) ??
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.official === true &&
        video.type === "Teaser"
    ) ??
    null
  );
}