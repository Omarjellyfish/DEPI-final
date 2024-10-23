import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Testimonials.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    review: "",
    rating: 5,
    title: "",
  });

  const isJSON = async (response) => {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3000/review", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await isJSON(response);
        console.log(data,'hell from data in testmonials');
        if (!data) {
          throw new Error("Invalid JSON response from server.");
        }

        if (!response.ok) {
          throw new Error(data.error.message || "Error fetching reviews.");
        }

        setReviews(data);
      } catch (error) {
        toast.error(`Error: ${error.message}`, { position: "top-center" });
      }
    };
    fetchReviews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
        params: {userId:""} // will be changed to get user id from token
      });

      const data = await isJSON(response);
      if (!data) {
        throw new Error("Invalid JSON response from server.");
      }

      if (!response.ok) {
        throw new Error(data.error.message || "Error submitting review.");
      }

      toast.success("Review added successfully!", { position: "top-center" });

      setNewReview({ user: "", review: "", rating: 5, title: "" });
      const updatedReviews = await fetch("/api/reviews");
      const updatedData = await isJSON(updatedReviews);
      if (updatedData) {
        setReviews(updatedData);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { position: "top-center" });
    }
  };

  return (
    <div className="testimonials-section d-flex justify-content-center align-items-center flex-column text-center py-5">
      <h2 className="our-customers">Our Customers Love What We Do</h2>
      <p className="lead mb-5">
        Read their reviews to discover why they're raving about our quality,
        service, and overall experience.
      </p>

      <ToastContainer theme="dark" />

      <Form
        onSubmit={handleSubmit}
        className="mb-5 card form-card-parent d-flex justify-content-center align-items-center form-card-testimonials p-4 shadow-lg border-0"
      >
        <h3 className="submit-your-review mt-3 mb-4">Submit Your Review</h3>
        <Row>
          <Col className="col-12">
            <Form.Group className="mb-3 form-group-parent">
              <Form.Label className="testi-name">Your Name</Form.Label>
              <Form.Control
                className="form-control-testimonials mb-3"
                type="text"
                name="user"
                value={newReview.user}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>
          </Col>
          <Col className="col-12">
            <Form.Group className="mb-3 form-group-parent">
              <Form.Label className="testi-title">Review Title</Form.Label>
              <Form.Control
                className="form-control-testimonials mb-3"
                type="text"
                name="title"
                value={newReview.title}
                onChange={handleInputChange}
                placeholder="Review title"
                required
              />
            </Form.Group>
          </Col>
          <Col className="col-12">
            <Form.Group className="mb-3 form-group-parent">
              <Form.Label className="testi-review">Your Review</Form.Label>
              <Form.Control
                className="form-control-testimonials mb-3"
                as="textarea"
                rows={3}
                name="review"
                value={newReview.review}
                onChange={handleInputChange}
                placeholder="Write your review here"
                required
              />
            </Form.Group>
          </Col>
          <Col className="col-12">
            <Form.Group className="mb-3 form-group-parent">
              <Form.Label className="testi-rating">Rating</Form.Label>
              <Form.Select
                className="form-control-testimonials rating-num fs-4 mb-3"
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button
          type="submit"
          variant="primary"
          className="submit-review-btn fs-5"
        >
          Submit Review
        </Button>
      </Form>

      {reviews.length > 0 ? (
        <Row className="g-4">
          {reviews.map((review, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="h-100 testimonial-card">
                <Card.Body>
                  <div className="testimonial-rating mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-warning">
                        ★
                      </span>
                    ))}
                    <span className="rating-value ms-2">
                      ({review.rating}.0)
                    </span>
                  </div>
                  <Card.Text>{review.review}</Card.Text>
                  <Card.Footer className="border-0 text-start">
                    <div className="testimonial-author">
                      <img
                        src={`https://api.dicebear.com/5.x/initials/svg?seed=${review.user}`}
                        alt={review.user}
                        className="rounded-circle me-2"
                        width="40"
                      />
                      <div className="author-info">
                        <h6 className="mb-0">{review.user}</h6>
                        <small>{review.title}</small>
                      </div>
                    </div>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="fs-4">No reviews available.</p>
      )}
    </div>
  );
};

export default Testimonials;
