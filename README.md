# Doctor Appointment Booking System

**EasyReserve** is a web-based **Doctor Appointment Booking System** developed as part of the Digital Egypt Pioneers Initiative (DEPI) graduation project. It allows patients to conveniently schedule and manage their appointments with doctors from various clinics, while also enabling doctors and clinics to showcase their services and availability, while offering an admin dashboard for managing bookings and viewing statistics. It is designed to support secure, scalable, and responsive features for a seamless user experience.

## Features
- **User-Friendly Interface**: Patients can browse through available doctors, view their profiles, and check available time slots for appointments.
- **Service Display**: Doctors and clinics can list their offered services, helping patients choose the right healthcare provider.
- **Appointment Booking**: Patients can book, view, edit, or cancel their appointments with ease.
- **Secure Authentication**: Patients and doctors can log in securely to manage their appointments and profiles.
- **Admin Features**: Clinics can manage their doctor's schedules, services, and availability directly within the system.
- **Booking Review**: Users can view and cancel their bookings.
- **Statistics Dashboard**: The system provides a dashboard to view booking statistics such as the number of bookings, types of services, etc.
  - **Responsive Design**: The interface should be fully responsive, supporting both mobile and desktop views.
- **Database Management**: MongoDB will be used to store data for bookings and users.
- **Security**: Implement CSRF protection to ensure secure data requests.
- **Payment Integration**: Integration with third-party payment systems like Stripe or PayPal for processing transactions.

## Technologies Used
- **Frontend**: [React.js](https://reactjs.org/) for the user interface.
- **Backend**: Node.js with Express.js to manage the server and APIs.
- **Database**: MongoDB for storing user data, appointments, and doctor information.
- **Authentication**:Tokens for secure login sessions.
- **Email Notifications**: Confirming appointments or notification of cancellation
- **Payment Integration**: PayPal for handling payments.
- **Security**: CSRF protection and secure data handling.


## To Run The App
- **npm start** for running the backend
- **npm run dev** for running the frontend
- You would also require a couple of things for running the database, such as a .env file and database connection to MongoDB
  -port=3000
  -CONNECTION_STRING=
  -TRAIL_MAIL= 
  -TRAIL_PASSWORD= 
  
  -PAYPAL_CLIENT_ID=
  -PAYPAL_SECRET=
  -PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
  -BASE_URL=http://localhost:3000
  -FRONT_BASE_URL=http://localhost:4000
