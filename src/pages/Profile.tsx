import React, { useState } from "react";
import "./styles/Profile.css";

const Profile = () => {
  return (
    <>
      <div className="banner-container">
        <img src="/images/default banner.png" className="banner" />
        <div className="profilepic-container">
          <img src="/images/sample profile pic.jpg" className="profilepic" />
        </div>
      </div>
      <br />
      <div>
        <h2>Name</h2>
        <p>Description</p>
      </div>
    </>
  );
}

export default Profile;