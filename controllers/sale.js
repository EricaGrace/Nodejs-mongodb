import Sale from "./../models/sale.js";

/**
 * Get all sales
 * @param {*} req
 * @param {*} res
 */
export async function getSales(req, res) {
  try {
    const { startDate, endDate } = req.query;
    if (
      !startDate ||
      !endDate ||
      isNaN(Date.parse(startDate)) ||
      isNaN(Date.parse(endDate))
    ) {
      const sale = await Sale.find();
      res.status(200).json(sale);
    } else {
      const sales = await Sale.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      }).populate("restaurant");
      res.status(200).json(sales);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Get a sale
 * @param {*} req
 * @param {*} res
 */
export async function getSale(req, res) {
  try {
    const sale = await Sale.findById(req.params.id).populate("restaurant");
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Create sale
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function createSale(req, res) {
  try {
    const sale = new Sale(req.body);
    await sale
      .save()
      .then((result) => {
        return res.status(201).json({
          message: "Sale created successfully!",
          sale: result,
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.toString() });
      });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}

/**
 * Update sale
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function updateSale(req, res) {
  try {
    await Sale.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Sale updated !" }))
      .catch((error) => res.status(500).json({ error: error.toString() }));
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}

/**
 * Delete sale
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function deleteSale(req, res) {
  try {
    const sale = await Sale.findByIdAndRemove({
      _id: req.params.id,
    })
      .then(() => res.status(200).json({ message: "Sale deleted !" }))
      .catch((error) => res.status(500).json({ error: error.toString() }));
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}

/**
 * Best sale
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function getHighestAmount(req, res) {
  try {
    const highestSale = await Sale.find()
      .sort({ amount: -1 })
      .limit(1)
      .populate("restaurant")
      .then((result) => res.status(200).json({ sale: result }))
      .catch((error) => res.status(500).json({ error: error.toString() }));
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}

/**
 * Returns the total amount of all sales
 * @param {*} req
 * @param {*} res
 */
export async function getTotalAmountOfSales(req, res) {
  try {
    const totalAmount = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({ totalAmount: totalAmount[0].totalAmount });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}
