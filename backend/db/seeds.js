const mongoose = require('mongoose')
// mongoose.Promise = require('bluebird')
const { dbURI } = require('../config/environment')
const User = require('../models/User')
const Medicines = require('../models/medicines')
const meds = require('./meds')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)

    db.dropDatabase()
      .then(() => {
        return User.create([{
          username: 'doctor1',
          email: 'doctor1@gmail.com',
          password: 'doctor1',
          passwordConfirmation: 'doctor1',
          role: 'doctor',
          expertise: 'General Practitioner, Dermatologist',
          clinic: 'London',
          appointment: [],
          history: []
        }, {
          username: 'doctor2',
          email: 'doctor2@gmail.com',
          password: 'doctor2',
          passwordConfirmation: 'doctor2',
          role: 'doctor',
          expertise: 'General Practitioner, Otolaryngologist',
          clinic: 'London',
          appointment: [],
          history: []
        }, {
          username: 'doctor3',
          email: 'doctor3@gmail.com',
          password: 'doctor3',
          passwordConfirmation: 'doctor3',
          role: 'doctor',
          expertise: 'General Practitioner, Psychiatrist',
          clinic: 'London',
          appointment: [],
          history: []
        }, {
          username: 'doctor4',
          email: 'doctor4@gmail.com',
          password: 'doctor4',
          passwordConfirmation: 'doctor4',
          role: 'doctor',
          expertise: 'General Practitioner, Pediatrician',
          clinic: 'London',
          appointment: [],
          history: []
        }, {
          username: 'doctor5',
          email: 'doctor5@gmail.com',
          password: 'doctor5',
          passwordConfirmation: 'doctor5',
          role: 'doctor',
          expertise: 'General Practitioner, Rheumatologist',
          clinic: 'London',
          appointment: [],
          history: []
        }, {
          username: 'patient1',
          email: 'patient1@gmail.com',
          password: 'patient1',
          passwordConfirmation: 'patient1',
          role: 'patient',
          appointment: [],
          history: []
        }, {
          username: 'patient2',
          email: 'patient2@gmail.com',
          password: 'patient2',
          passwordConfirmation: 'patient2',
          role: 'patient',
          appointment: [],
          history: []
        }, {
          username: 'patient3',
          email: 'patient3@gmail.com',
          password: 'patient3',
          passwordConfirmation: 'patient3',
          role: 'patient',
          appointment: [],
          history: []
        }
        ])
      })
      .then((doctors) => {
        console.log(`${doctors.length} user created`)
        return Medicines.create(meds())
      })
      .then(meds => console.log(`${meds.length} medicines created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  })