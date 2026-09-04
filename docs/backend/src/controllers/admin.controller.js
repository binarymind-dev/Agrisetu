exports.getAnalytics = async (req, res) => {
  res.json({ totalListings: 0, totalOrders: 0, activeUsers: 0 });
};
