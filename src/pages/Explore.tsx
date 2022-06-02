import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Footer from "../components/Footer";
import "./styles/Explore.css";

const Explore: React.FC = () => {
  const [state, setState] = useState<string>();

  return (
    <div>
      <h1>Explore</h1>

      <div>
        <div className="bg-image-container">
          <img src="./images/explore page background.jpg" className="bg-image" />
        </div>
        <div className="bg-text">
          <h1>Search bar</h1>
        </div>
      </div>
      
      <div className="flex-row">
        <Grid container alignItems="center" style={{ width: "90%" }}>
          {Array(6).fill(0).map(() => (
            <Grid item md={4} sm={6} xs={12}>
              <div className="card">
                <Grid container alignItems="center">
                  <Grid item lg={6} xs={12}>
                    <div>
                      <img src="./images/sample profile pic.jpg" className="profilepic" />
                    </div>
                  </Grid>
                  <Grid item lg={6} xs={12} justifyContent="center" alignItems="center">
                    <div>
                      <h2>Name</h2>
                      <h5>Description</h5>
                    </div>
                    <Button variant="contained" color="error">Profile</Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      <Footer />
    </div>
  );
}

export default Explore;