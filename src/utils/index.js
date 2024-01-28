const API_KEY = "c99f35062db07ba9561a67a0c05613a3";
const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMedias = async (type) => {
    try {
        const response = await fetch(`${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data = await response.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
};


export const getPopularMedias = async (type) => {
    try {
        const response = await fetch(`${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`, {
            method: "GET",
        });

        const data = await response.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
}

export const getTopRatedMedias = async (type) => {
    try {
        const response = await fetch(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`, {
            method: "GET",
        });

        const data = await response.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
}

export const getTVorMoviesByGenre = async (type, id) => {
    try {
        const response = await fetch(`${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${id}`, {
            method: "GET",
        });

        const data = await response.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
}

export const getTVorMovieVideosByID = async (type, id) => {
    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`, {
            method: "GET",
        }
        );
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

export const getTVorMovieSearchResults = async (type, query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/${type}?api_key=${API_KEY}&language=en-US&include_adult=false&query=${query}`, {
            method: "GET",
        });

        const data = await response.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
}

export const getTVorMovieDetailsByID = async (type, id) => {
    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`, {
            method: "GET",
        }
        );
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

export const getSimilarTVorMovies = async (type, id) => {
    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`, {
            method: "GET",
        }
        );

        const data = await response.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
};

export const getAllfavorites = async (uid, accountID) => {
    try {
        const response = await fetch(`/api/favorites/get-all-favorites?id=${uid}&accountID=${accountID}`, {
            method: "GET",
        }
        );

        const data = await response.json();

        return data && data.data;
    } catch (e) {
        console.log(e);
    }
};

export const getAllQuestions = async (origin) => {
    try {
        const response = await fetch(`/api/questions/get-all-questions?origin=${origin}`, {
            method: "GET",
        }
        );

        const data = await response.json();
        return data && data.data;
    } catch (e) {
        console.log(e);
    }
};