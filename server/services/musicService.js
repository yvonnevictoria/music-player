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
  * @param {String} obj.searchTerm - The specified search term.
  */
const searchTracksUrl = ({ searchTerm }) => {
    return `https://itunes.apple.com/search?term=${searchTerm}&limit=25&media=music`;
};

/**
 * Helper to build API url.
 *
 * @private
 * @param {Object} obj - The arguments object.
 * @param {Response} obj.response - The response object returned by a fetch request.
 * @param {String} obj.albumId - The specified search term.
 */
const searchAlbumUrl = ({ albumId }) => {
   return `https://itunes.apple.com/lookup?id=${albumId}&entity=song`;
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
        const targetUrl = searchTracksUrl({ searchTerm });
        const { data } = await axios.get(targetUrl);

        const { results } = data;

        if (!results.length) {
            throw new Error('NOT_FOUND');
        }

        return results;
    }

    /**
     * Gets the stock price for the supplied stock symbol.
     *
     * @param {Object} obj - The arguments object.
     * @param {String} obj.searchTerm - The album to find info for.
     * @throws {Error} 'NOT_FOUND' - if album does not exist.
     * @returns {Array} The album tracks and artwork.
     */
    static async getAlbum({ albumId }) {
        const targetUrl = searchAlbumUrl({ albumId });
        const { data } = await axios.get(targetUrl);

        const { results } = data;

        if (!results.length) {
            throw new Error('NOT_FOUND');
        }

        return results;
    }
}

module.exports = { MusicService };
