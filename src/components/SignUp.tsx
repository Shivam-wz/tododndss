import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import gsap from "gsap";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Animation for form fields
    gsap.from(".signup-form-field", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });

    // Animation for Sign Up button
    gsap.from(".signup-button", {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && name && email && password) {
      const newUser = { username, name, email, password };
      localStorage.setItem(`user_${username}`, JSON.stringify(newUser));
      navigate("/signin");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="h4">Sign Up</Typography>
        <form onSubmit={handleSignUp}>
          <TextField
            className="signup-form-field"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            className="signup-form-field"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            className="signup-form-field"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
            type="email"
            required
          />
          <TextField
            className="signup-form-field"
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            type="password"
            required
          />
          <Button
            className="signup-button"
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Already a user?{" "}
          <Link to="/signin" style={{ textDecoration: "none", color: "#1976d2" }}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
