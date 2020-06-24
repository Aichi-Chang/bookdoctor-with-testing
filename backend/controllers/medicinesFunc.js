const Medicines = require('../models/Medicines')


function create(req, res) {
  Medicines
    .create(req.body)
    .then(() => res.status(201).json({ message: 'meds created' }))
    .catch(err => res.json(err))
}

function index(req, res) {
  Medicines
    .find()
    .then(meds => res.status(200).json(meds))
    .catch(err => res.json(err))
}




module.exports = {
  create,
  index
}