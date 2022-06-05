import React, { useState } from "react";
import "./styles/Profile.css";

const Card = () => {
  return (
    <div className="subs_card">
      <div className="profile_section_card">
        <h1>Junior Developer</h1>
        <h2>5$ Per Month</h2>
        <button>Join</button>
        <p>Thanks for your support</p>
      </div>
    </div>
  )
}

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
      <h2>Name</h2>
      <p>Description</p>
      <div className="subs_card_wrapper">
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}

export default Profile;