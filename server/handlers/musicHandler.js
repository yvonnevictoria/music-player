'use strict';

const { MusicService } = require('../services/musicService');

/**
 * @module
 */

module.exports = {
    /**
     *  Get track info.
     *
     * @param {Request} request - The Hapi request object.
     * @param {Object} h - The Hapi response toolkit.
     * @throws {Error} NOT_FOUND - If no tracks match search term.
     * @throws {Error} If an unknown error occurred.
     * @returns {Response} Response with top 25 track matches.
     */
    getMusicBySearchTerm: async (request, h) => {
        try {
            const { searchTerm } = request.query;
            const cleanedSearchTerm = searchTerm.replace(/\s/g, '+');

            const searchResults = await MusicService.getTracks({ searchTerm: cleanedSearchTerm });
            return h.response(searchResults).code(200)

        } catch (err) {
            switch (err.message) {
                case 'NOT_FOUND':
                    return h.response('No results').code(404)
                default:
                    return h.response().code(500)
            }
        }
    },

    /**
     *  Get track info.
     *
     * @param {Request} request - The Hapi request object.
     * @param {Object} h - The Hapi response toolkit.
     * @throws {Error} NOT_FOUND - If album does not exist.
     * @throws {Error} If an unknown error occurred.
     * @returns {Response} Album info - tracks and artwork.
     */
    getAlbum: async (request, h) => {
        try {
            const { id } = request.params;
            const albumTracks = await MusicService.getAlbum({ albumId: id });
            const { collectionName, artworkUrl100 } = albumTracks[0];

            // Remove first entry (album info) from API results
            const album = albumTracks.filter(track => track.wrapperType === 'track');
            return h.response({ album, collectionName, artworkUrl100 }).code(200)

        } catch (err) {
            switch (err.message) {
                case 'NOT_FOUND':
                    return h.response('No album results').code(404)
                default:
                    return h.response().code(500)
            }
        }
    }
};
