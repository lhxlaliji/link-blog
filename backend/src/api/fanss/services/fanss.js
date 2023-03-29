'use strict';

/**
 * fanss service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fanss.fanss');
