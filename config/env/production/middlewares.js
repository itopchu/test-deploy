module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com'],
            'media-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              'res.cloudinary.com',
            ],
            'script-src': ["'self'", 'cdn.jsdelivr.net', 'https:'],  // Add 'cdn.jsdelivr.net' to allow scripts from this domain
            upgradeInsecureRequests: null,
          },
        },
      },
    },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
