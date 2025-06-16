const supportedLocales = ["en", "ua"];

const localeMiddleware = (req, res, next) => {
  const acceptLanguage = req.headers["accept-language"];
  let locale = "en"; // default

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(",")[0].toLowerCase();
    if (supportedLocales.includes(preferredLocale)) {
      locale = preferredLocale;
    }
  }

  req.locale = locale;
  next();
};

module.exports = localeMiddleware;
