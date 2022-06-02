import React, { useState } from "react";
import Footer from "../components/Footer";
import "./styles/Home.css";

const Home: React.FC = () => {
  const [state, setState] = useState<string>();

  return (
    <>
      <h1>Home</h1>
      <Footer />
    </>
  );
}

export default Home;