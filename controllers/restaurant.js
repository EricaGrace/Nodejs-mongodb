import Restaurant from "./../models/restaurant.js";

/**
 * Get all restaurants
 * @param {*} req
 * @param {*} res
 */
export async function getRestaurants(req, res) {
  try {
    const restaurant = await Restaurant.find();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Get a restaurant
 * @param {*} req
 * @param {*} res
 */
export async function getRestaurant(req, res) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Create restaurant
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function createRestaurant(req, res) {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant
      .save()
      .then((result) => {
        return res.status(201).json({
          message: "Restaurant created successfully!",
          restaurant: result,
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
 * Update restaurant
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function updateRestaurant(req, res) {
  try {
    await Restaurant.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Restaurant updated !" }))
      .catch((error) => res.status(500).json({ error: error.toString() }));
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}

/**
 * Delete restaurant
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function deleteRestaurant(req, res) {
  try {
    const restaurant = await Restaurant.findByIdAndRemove({
      _id: req.params.id,
    })
      .then(() => res.status(200).json({ message: "Restaurant deleted !" }))
      .catch((error) => res.status(500).json({ error: error.toString() }));
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}
