'use strict';

const axios = require('axios')

/**
 * @module
 */


 /**
  * Helper to build API url.
  *
  * @private
  * @param {Object} obj - The arguments object.
  * @param {Response} obj.response - The response object returned by a fetch request.
  * @param {String} obj.stockSymbol - The specified stock symbol.
  */
const url = ({ searchTerm }) => {
    return `https://itunes.apple.com/search?term=${searchTerm}&limit=25&media=music`;
};

/**
 * @classdesc Retrieves information about tracks.
 * @hideconstructor
 */
class MusicService {

    /**
     * Gets the stock price for the supplied stock symbol.
     *
     * @param {Object} obj - The arguments object.
     * @param {String} obj.searchTerm - The search term to find results for.
     * @throws {Error} 'NOT_FOUND' - if search term does not have any results.
     * @returns {Array} The top 25 tracks that match the search term.
     */
    static async getTracks({ searchTerm }) {
        const targetUrl = url({ searchTerm });
        const { data } = await axios.get(targetUrl);

        const { results } = data;

        if (!results.length) {
            throw new Error('NOT_FOUND');
        }

        return results;
    }
}

module.exports = { MusicService };
