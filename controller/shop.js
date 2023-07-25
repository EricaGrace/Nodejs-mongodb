exports.getShop = (req, res, next) => {
  res.status(200).json({
    name: "",
    address: "",
    openingHours: "",
  });
};

exports.createShop = (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;
  const openingHours = req.body.openingHours;
  res
    .status(200)
    .json({
      message: "shop created successfully",
      shop: { name: name, address: address, openingHours: openingHours },
    });
};
