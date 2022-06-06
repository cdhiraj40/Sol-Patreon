import React, {useState, useEffect} from "react";
import pic from "./images/aboutus.png";

const About: React.FC = () => {
    const [state, setState] = useState<string>();

    return (
        <>
            <div className="About">
                <h2 className="text1">Sol-Patreon</h2>
                <div className="Aboutsection">

                    <img src={pic} alt=""/>

                    <p>Sol-Patreon is a decentralized way for creators to get paid for creating content for their fans.
                        It helps creators to accept support and membership from their fan</p>
                </div>
            </div>
        </>
    );
}

export default About;