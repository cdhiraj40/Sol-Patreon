import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
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
        <div className="flex-row">
          <MonetizationOnIcon className="logo-icon white-text" />
          <div style={{ marginLeft: 10 }}>
            <h2 className="white-text">Sol-Patreon</h2>
          </div>
        </div>
      </div>

      <Grid container className="footer-section" direction="row" spacing={4} style={{ width: "50%" }}>
        <Grid item sm={3} xs={6}>
          <Link to="/" className="link">Home</Link>
        </Grid>
        <Grid item sm={3} xs={6}>
          <Link to="/" className="link">Explore</Link>
        </Grid>
        <Grid item sm={3} xs={6}>
          <Link to="/" className="link">About</Link>
        </Grid>
        <Grid item sm={3} xs={6}>
          <Link to="/" className="link">Services</Link>
        </Grid>
      </Grid>

      <Grid container className="footer-section" direction="row" style={{ maxWidth: 200, marginBottom: 0 }}>
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

      <div className="footer-section" style={{ marginTop: 8 }}>
        <p className="white-text">© Copyright 2022 Sol-Patreon</p>
      </div>
      
    </footer>
  );
}

export default Footer;