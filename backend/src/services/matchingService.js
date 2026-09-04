function matchListings(listings, criteria) {
  return listings.filter((l) => {
    if (criteria.crop && l.crop !== criteria.crop) return false;
    if (criteria.location && l.location !== criteria.location) return false;
    return true;
  });
}

module.exports = { matchListings };
