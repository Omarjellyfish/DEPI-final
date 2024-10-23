# Doctor Appointment Booking System

**EasyReserve** is a web-based **Doctor Appointment Booking System** developed as part of the Digital Egypt Pioneers Initiative (DEPI) graduation project. It allows patients to conveniently schedule and manage their appointments with doctors from various clinics, while also enabling doctors and clinics to showcase their services and availability, while offering an admin dashboard for managing bookings and viewing statistics. It is designed to support secure, scalable, and responsive features for a seamless user experience.

## Features

- **User-Friendly Interface**: Patients can browse through available doctors, view their profiles, and check available time slots for appointments.
- **Service Display**: Doctors and clinics can list their offered services, helping patients choose the right healthcare provider.
- **Appointment Booking**: Patients can book, view, edit, or cancel their appointments with ease.
- **Secure Authentication**: Patients and doctors can log in securely to manage their appointments and profiles.
- **Admin Features**: Clinics can manage their doctor’s schedules, services, and availability directly within the system.
- **Booking Review**: Users can view and cancel their bookings.
- **Statistics Dashboard**: The system provides a dashboard to view booking statistics such as the number of bookings, types of services, etc.
- **Scalability**: The system should handle at least 1000 concurrent users efficiently.
- **Responsive Design**: The interface should be fully responsive, supporting both mobile and desktop views.
- **Database Management**: MongoDB will be used to store data for bookings and users.
- **Security**: Implement CSRF protection to ensure secure data requests.
- **Payment Integration**: Integration with third-party payment systems like Stripe or PayPal for processing transactions.
- **API Logging**: Detailed logging should be implemented for API requests to assist in debugging and monitoring.

## Technologies Used

- **Frontend**: [React.js](https://reactjs.org) for the user interface.
- **Backend**: Node.js with Express.js to manage the server and APIs.
- **Database**: MongoDB for storing user data, appointments, and doctor information.
- **Authentication**: JWT (JSON Web Tokens) for secure login sessions.
- **Email Notifications**: Used for sending notifications and reminders to patients.
- **Payment Integration**: Stripe or PayPal for handling payments.
- **Security**: CSRF protection and secure data handling.


## Project Structure

```plaintext
Frontend-booking-system/
│
├── node_modules/
│
├── public/
│   └── images/
│       └── stethoscope.svg
│
├── src/
│   ├── assets/
│   │   └── logo.png
│   │
│   ├── components/
│   │   └── Navbar/
│   │       ├── Navbar.jsx
│   │       └── Navbar.css
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Review/
│   │   │   ├── Review.jsx
│   │   │   └── Review.css
│   │   ├── Services/
│   │   │   ├── Services.jsx
│   │   │   └── Services.css
│   │   ├── Signup/
│   │   │   ├── Signup.jsx
│   │   │   └── Signup.css
│   │   ├── Success/
│   │   │   ├── Success.jsx
│   │   │   └── Success.css
│   │   └── Time/
│   │       ├── Time.jsx
│   │       └── Time.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── README.md
```


## Screenshots (Soon)

Explore the project live [here](< https://fouad-gabr.github.io/Booking-and-reservation-system/>) or clone the repository to view the code and contribute to its development.
