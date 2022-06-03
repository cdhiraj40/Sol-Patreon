import React, { useState, useEffect } from "react";
import pic from "./images/aboutus.png";

const About: React.FC = () => {
  const [state, setState] = useState<string>();

  return (
    <>
    <div className="About">
    <h2 className="text1">About Us</h2>
    <div className="Aboutsection">
      
        <img src={pic} alt="" />
       
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ea neque architecto incidunt cupiditate obcaecati harum deserunt pariatur nihil! Omnis minima maxime est neque aperiam modi eveniet tenetur sequi quis.</p>
    </div>
    </div>
    </>
  );
}

export default About;