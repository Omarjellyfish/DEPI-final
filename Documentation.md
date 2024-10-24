
# Project Documentation

## API Documentation

### Review API

#### 1. Get All Reviews

- **Endpoint:** `/api/reviews`
- **Method:** `GET`
- **Description:** Fetches all reviews from the database.

**Request:**
- Headers:
  - `Content-Type: application/json`

**Response:**
- Status: 200 OK
- Body:
  ```json
  [
    {
      "user": "UserName",
      "review": "This is a review text.",
      "rating": 5,
      "title": "Review Title"
    }
  ]
  ```

**Error Response:**
  ```json
  {
    "error": {
      "message": "Error fetching reviews.",
      "source": "Review Controller",
      "status": 500
    }
  }
  ```

#### 2. Post a Review

- **Endpoint:** `/api/reviews`
- **Method:** `POST`
- **Description:** Adds a new review to the database.

**Request:**
- Headers:
  - `Content-Type: application/json`

**Body:**
  ```json
  {
    "user": "UserName",
    "review": "This is a review text.",
    "rating": 5,
    "title": "Review Title"
  }
  ```

**Response:**
- Status: 201 Created
- Body:
  ```json
  {
    "message": "Review added successfully."
  }
  ```

**Error Response:**
  ```json
  {
    "error": {
      "message": "Error adding review.",
      "source": "Review Controller",
      "status": 500
    }
  }
  ```

### Appointment Controller Documentation

#### 1. Create Appointment

- **Endpoint:** `/appointments`
- **Method:** `POST`
- **Description:** Create a new appointment in the database.

**Request:**
- Headers:
  - `Content-Type: application/json`

**Body:**
  ```json
  {
    "year": 2024,
    "month": 10,
    "day": 23,
    "timeSlot": "10:30AM-11:00AM",
    "user": "userId",
    "service": "serviceId",
    "cost": 500
  }
  ```

**Response:**
- Status: 201 Created
- Body:
  ```json
  {
    "message": "Appointment created successfully.",
    "appointment": {
      // ... appointment data
    }
  }
  ```

#### 2. Get All Appointments for User

- **Endpoint:** `/appointments/user/:userId`
- **Method:** `GET`
- **Description:** Fetch all appointments booked by a specific user.

**Request:**
- Params:
  - `userId`: The ID of the user whose appointments are to be retrieved.

**Response:**
- Status: 200 OK
- Body:
  ```json
  {
    "appointments": [
      {
        "_id": "appointmentId",
        "months": {
          "year": 2024,
          "month": 10,
          "days": {
            "day": 23,
            "times": {
              "timeSlot": "09:00 AM",
              "appointment": {
                "user": "userId",
                "service": "serviceId",
                "cost": 500,
                "duration": 30
              }
            }
          }
        }
      }
    ]
  }
  ```

**Error Response:**
  ```json
  {
    "message": "No appointments found for this user."
  }
  ```

### Service API

#### 1. Get All Services

- **Endpoint:** `/api/services`
- **Method:** `GET`
- **Description:** Fetches all services from the database.

**Request:**
- Headers:
  - `Content-Type: application/json`

**Response:**
- Status: 200 OK
- Body:
  ```json
  [
    {
      "name": "Service Name",
      "cost": 100
    }
  ]
  ```

**Error Response:**
  ```json
  {
    "error": {
      "message": "Error fetching services.",
      "source": "Service Controller",
      "status": 500
    }
  }
  ```

#### 2. Add a Service

- **Endpoint:** `/api/services`
- **Method:** `POST`
- **Description:** Adds a new service to the database.

**Request:**
- Headers:
  - `Content-Type: application/json`

**Body:**
  ```json
  {
    "name": "Service Name",
    "cost": 100
  }
  ```

**Response:**
- Status: 201 Created
- Body:
  ```json
  {
    "message": "Service added successfully."
  }
  ```

**Error Response:**
  ```json
  {
    "error": {
      "message": "Error adding service.",
      "source": "Service Controller",
      "status": 500
    }
  }
  ```

### WorkDays API Documentation

#### 1. Get Work Days

- **Endpoint:** `/api/workdays`
- **Method:** `GET`
- **Description:** Retrieves a list of workdays from the database.

**Request:**
- Headers:
  - `Content-Type: application/json`

**Response:**
- Status: 200 OK
- Body:
  ```json
  [
    {
      "startWorkDay": "2024-01-01",
      "endWorkDay": "2024-01-05"
    }
  ]
  ```

**Error Response:**
  ```json
  {
    "message": "Error fetching workdays."
  }
  ```

#### 2. Update Work Day

- **Endpoint:** `/api/workdays`
- **Method:** `PUT`
- **Description:** Updates the start or end workday based on the provided key and value.

**Request:**
- Headers:
  - `Content-Type: application/json`

**Body:**
  ```json
  {
    "key": "startWorkDay",
    "value": "2024-01-01"
  }
  ```

**Response:**
- Status: 200 OK
- Body:
  ```json
  {
    "message": "Workday updated successfully.",
    "updatedWorkDay": {
      "startWorkDay": "2024-01-01",
      "endWorkDay": "2024-01-05"
    }
  }
  ```

**Error Response:**
  ```json
  {
    "message": "Error updating workdays."
  }
  ```

### PayPal Integration

#### Step 4: Frontend Interaction with PayPal API

In your frontend (e.g., React), you can use axios to make requests to your backend PayPal routes.

##### Create an Order:

Send a POST request to `/api/paypal/create-order` to initiate the payment.

```javascript
import axios from "axios";

const createPaypalOrder = async (items, cost) => {
  try {
    const response = await axios.post("http://localhost:5000/api/paypal/create-order", {
      items,
      cost
    });
    const { approvalUrl } = response.data;
    window.location.href = approvalUrl;
  } catch (error) {
    console.error("Error creating PayPal order:", error);
  }
};
```

##### Capture Payment After User Approval:

After PayPal redirects the user back, capture the payment by sending a request to `/api/paypal/capture-payment/:orderId`.

```javascript
const capturePaypalPayment = async (orderId) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/paypal/capture-payment/${orderId}`);
    console.log("Payment captured successfully:", response.data);
  } catch (error) {
    console.error("Error capturing PayPal payment:", error);
  }
};
```

**Environment:** Use PayPal sandbox credentials for testing, and update them for production.