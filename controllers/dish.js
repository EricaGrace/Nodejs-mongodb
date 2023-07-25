import Dish from "./../models/dish.js";

/**
 * Get all dishes
 * @param {*} req
 * @param {*} res
 */
export async function getDishes(req, res) {
  try {
    const dish = await Dish.find();
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Create dish
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function createDish(req, res) {
  try {
    const dish = new Dish(req.body);
    await dish
      .save()
      .then((result) => {
        return res.status(201).json({
          message: "Dish created successfully!",
          dish: result,
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
 * Update dish
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function updateDish(req, res) {
  try {
    await Dish.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Dish updated !" }))
      .catch((error) => res.status(500).json({ error: error.toString() }));
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}

/**
 * Delete dish
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function deleteDish(req, res) {
  try {
    const dish = await Dish.findByIdAndRemove({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Dish deleted !" }))
      .catch((error) => res.status(500).json({ error: error.toString() }));
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}
