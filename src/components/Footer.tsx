import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./styles/Footer.css";

const Footer = () => {
  const [state, setState] = useState<string>();

  return (
    <footer className="footer">
      <div className="footer-section">
        <Logo />
      </div>

      <Grid container className="footer-section links-container" direction="row" spacing={4}>
        <Grid item sm={3} xs={6}>
          <Link to="/" className="link">Home</Link>
        </Grid>
        <Grid item sm={3} xs={6}>
          <Link to="/explore" className="link">Explore</Link>
        </Grid>
        <Grid item sm={3} xs={6}>
          <Link to="/" className="link">About</Link>
        </Grid>
        <Grid item sm={3} xs={6}>
          <Link to="/" className="link">Services</Link>
        </Grid>
      </Grid>

      <Grid container className="footer-section social-media" direction="row">
        <Grid item xs={3}>
          <IconButton>
            <InstagramIcon className="white-text" />
          </IconButton>
        </Grid>
        <Grid item xs={3}>
        <IconButton>
            <FacebookIcon className="white-text" />
          </IconButton>
        </Grid>
        <Grid item xs={3}>
        <IconButton>
            <TwitterIcon className="white-text" />
          </IconButton>
        </Grid>
        <Grid item xs={3}>
        <IconButton>
            <LinkedInIcon className="white-text" />
          </IconButton>
        </Grid>
      </Grid>

      <div className="footer-section copyright-container">
        <p className="white-text">© Copyright 2022 Sol-Patreon</p>
      </div>
      
    </footer>
  );
}

export default Footer;