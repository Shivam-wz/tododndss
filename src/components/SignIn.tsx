import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import Captcha from "./Captcha";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [captchaExpected, setCaptchaExpected] = useState<number | null>(null);
  const [captchaValid, setCaptchaValid] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem(`user_${username}`);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.username === username && user.password === password) {
        if (captchaExpected !== null && parseInt(captchaInput, 10) === captchaExpected) {
          localStorage.setItem("authenticated", "true");
          navigate("/dashboard");
        } else {
          setCaptchaValid(false);
        }
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("User not found");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="h4">Sign In</Typography>
        <form onSubmit={handleSignIn}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            type="password"
            required
          />
          <Box sx={{ marginTop: 2 }}>
            <Captcha
              onCaptchaChange={(value) => setCaptchaInput(value)}
              onCaptchaGenerated={(value) => setCaptchaExpected(value)}
            />
          </Box>
          {!captchaValid && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              Incorrect CAPTCHA
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Sign In
          </Button>
        </form>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          New Here?{" "}
          <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
