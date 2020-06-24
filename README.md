# Bookdoctor 

Due to COVID and NHS found cut, our NHS has difficulties to cope with the current situation. There are too many patients and not enough staff to help them. Therefore I worked with other developers to create this online GP appointment booking system. 

The normal way of booking your GP appointment is to call your GP surgery. But as there are many people dialling to request COVID information, I think we should leave the phone line to those who actually need to ask questions and move the booking system online.

This appointment management system should come handy for both GP surgeries and their patients. So we've set up two login system for doctor and patient. Both roles will be able to book an appointment but only doctors can see the full patient list and write a medical history or prescribe medicines to their patients. when a patient logged in, they can check what medicine they've been prescribed, or any advice the doctor wants to give them.

The other difficult part of the original telephone booking is that patients never know when a doctor is available. They will have to check again and again over the phone to find out the exact time that suits them and the doctor they want to see. At bookdoctor, we display doctors' booked appointment calendar, so users will be able to see clearly which day is still available for bookings. 

We've also set up an email confirmation once an appointment is booked in our application's beta period. It might change in the future that rather than sending out an email to confirm, we will also send out an email or an SMS as a reminder 2 days before their appointments.


#### 🔥 Visit the site here → [Bookdoctor](https://book-doctor.herokuapp.com/) 🔥

#### We've created a couple testing accouns for you to test (Please don't delete these test accounts...)

| **Patient**    | Details         |
| ----------- | ----------- |
| username      | patient1         |
| email      | patient1@gmail.com         |
| password      | patient1         |

| **Doctor**     | Details     |
| ----------- | ----------- |
| username      | doctor1         |
| email      | doctor1@gmail.com         |
| password      | doctor1         |

You can also register your own account(with real email). Please note that once registered, you're agree to us using and processing your data as your username will display in the doctors' patient list, you will also recive an email sent from us if you book an appointment. But you will be able to delete your account as well ;)





### 🎥 Preview 
![ezgif com-video-to-gif](https://media.giphy.com/media/YrO11LriPyQZXQ1LP3/giphy.gif)



### 💎 features 
- Set the default in the backend, user cannot choose the role while registering. The default role is ‘patient’. Doctors are registered as seeds in the database.

- When an appointment is created, an appointment object will be created in the appointment collection in the database and be pushed to both doctor's and patient's appointment array. It also worked when deleting an appointment, the specific appointment object will be removed from these three collections.

- How to know if the doctor you want to see is available? By selecting a doctor from the drop-down list at the booking page, you will be able to see the doctor's booked appointments display in the calendar.

- Similar rules apply to patients' medical history column, the small differences are that history will be able to write(create) by a doctor, and it will only be created in the history collection and be pushed to patient's history array. 

- User dashboard shows all booked appointments and medical histories. User will also be able to delete their appointment if needed.

- The confirmation email system will send out an email to confirm your appointment once booked.



### :rocket: Get Started Locally

* Clone or download the repo
* `npm install` to install all the dependencies
* `mongod dbpath ~/data/db`  or `mongod` (if you Mac is majovee version)
* `npm run seed`
* `npm run serve:back` to run backend
* `npm run serve:front` to run frontend
* You will need to apply for an API key from [SendGrid](https://sendgrid.com/) and create a .env file to store it
* To run the project locally you will also need to create a dev.js file in the root with other variebles. (secret, dbURI and port)




### 🕹 Main Technologies Used

#### Backend: ####

* Express
* NodeJS 
* MongoDB Atlas
* Mongoose
* Nodemon
* JWT
* SendGrid
* NHS Corona Virus API

#### Frontend & UI: ####

* JavaScript
* React
* SASS & CSS
* MaterialUI
* Bulma
* Google fonts
* Art works by United Nation Covid19 Reponse

#### Version Control: ####

* Git
* GitHub

#### Other: ####

* Insomnia (API test)
* Heroku (cloud platform for deployment)
* Babel (JavaScript transcompiler)
* Webpack (JavaScript module bundler)



### ✔️ Approach Taken

#### Project Plan ####
- Ideas research, Team brief, set up Trello
- Set up (libraries, backend and frontend basic frame, Webpack...)
- Backend functionality and authentication set up, test endpoints
- Frontend UI desgin research, test API CRUD
- Adding new features to both ends
- Adding third party API
- Secure route and user control
- Sanitize user inputs
- Styling and Troubleshooting
- Deployment (debug and deploy)



### 🧐 Chanllenges

#### User control
As we want patients and doctors can both use this app. In order to create two different colelctions in the databas, it's easier and DRYer to set a user control in our backend. When user requests an action, the backend middleware will check if this user has the correct authorization for it.

```js
  role: {
    type: String,
    enum: ['doctor', 'patient', 'admin'],
    default: 'patient'
  }
```
```js
router.post('/history', secureRoute, userControl('doctor'),
  [
    check('content').not().isEmpty().trim().escape()
  ],  historyFunc.create)
```

#### Check if the appointment is available and all parties got their appointment booked
To prevent this problem, the backend will first check in the appoinement collection and if no object matches, it will go to the next step which will create the appointment and push them to the correct users.

```js
const appoint = Appointment.findOne({ date: req.body.date, time: req.body.time, doctor: req.body.doctor }).exec()
    appoint
      .then(function(appointmentItem) {
        if (!appointmentItem) {
          console.log('Appointment available')
          Appointment
            .create(req.body)
            .then(async function(appointment) {
              try {
                const promise1 = User.findOneAndUpdate({ _id: req.currentUser._id }, { $push: { appointment: appointment } }, { new: true })
                const promise2 = User.findOneAndUpdate({ username: req.body.doctor }, { $push: { appointment: appointment } }, { new: true })
                ...
```

#### Showing different doctors' appointments
I set a handle change function in the selectDoc.js. Everytime when user selects a diffent doctor, it will update its parent component(which is the BookAppointment.js) reset the state and pass as props to the calendar component(which is the Picker.js).

**BookAppointment.js**
```js
    <SelectDoc 
      update={setData}
      data={data}
    />
```

**SelectDoc.js**
```js
function handleChange(e) {
    setSelect({ [e.target.name]: e.target.value })
    update({ ...data, [e.target.name]: e.target.value })
  }
```


#### Proxy error between dev server and API
This error occured when I set a delete function child component. The delete function was using axios to delete the specific appointment by id and reload the page. When the error showed up, I thought the problem is in the webpack, and this is the answer I've found: [React proxy error - ECONNREFUSED](https://stackoverflow.com/questions/50107816/react-proxy-error-could-not-proxy-request-api-from-localhost3000-to-http-l)

But this didn't fix the problem, so I then tested the API delete route endpint but it works fine. This is another solution: [Proxy error in register from](https://stackoverflow.com/questions/57858311/error-occured-while-trying-to-proxy-to-localhost3000-api-register-in-register) 

One thing I've noticed is that, in nodemon, the server shows delete appointment and right after it tries to get the user profile and booked appointment straight away. This made me think that it could be the asynchronous when deleting the data. After rewrote the delete function to an async funtion has 
solved the problem.


### 📸 Snapshots
![homepage](./assets/home.png)
![booking](./assets/booking.png)
![dashboard](assets/dashboard.png)



### 🔮 Potential Future Features ###

* When doctor is going to select a patient to write their medical history, they will be able to see all registered patients. We should check whether this is a real patient before putting the patients in doctor's patient list. This feature will reqiore manual check with the admin role in the backend and would require more information from the patient as well(their NI number, address and etc.)

* Set up a score system that if a patient did not show up for up to three times of their appointment, they will be moved to the black list and will be banned to use this online booking app. The surgery or the doctor could enter their patients' score manually, and if the array of score is >= 3 then they will be noted as black list patent.

* Users will be able to choose their own avatar






