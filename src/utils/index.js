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