'use strict';

/**
 * hayvan service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hayvan.hayvan');
