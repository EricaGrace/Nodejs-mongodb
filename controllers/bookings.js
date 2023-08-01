import Bookings from "./../models/bookings.js";

/**
 * Get all bookings in the db
 * @param {*} req
 * @param {*} res
 */
export async function getBookings(req, res) {
  try {
    const booking = await Bookings.find();
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Create a new Booking
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function createBooking(req, res) {
  try {
    const booking = new Bookings(req.body);
    await booking
      .save()
      .then((result) => {
        return res.status(201).json({
          message: "La réservation a bien été enregistrée!",
          booking: result,
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
 * Update a booking
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function updateBooking(req, res) {
  try {
    await Bookings.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Réservation modifiée !" }))
      .catch((error) => res.status(500).json({ error: error.toString() }));
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}

/**
 * Delete a booking
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function deleteBooking(req, res) {
  try {
    const booking = await Bookings.findByIdAndRemove({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Réservation supprimée !" }))
      .catch((error) => res.status(500).json({ error: error.toString() }));
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}
