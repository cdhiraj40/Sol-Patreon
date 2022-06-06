import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import "./styles/Navbar.css"
import dark_profile from "../assets/dark_profile.png"
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import Button from "@mui/material/Button";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import {ProfileModel} from "../api/ProfileModel";
import {creatorFilter, FetchProfiles} from "../api/fetchProfiles";

require("@solana/wallet-adapter-react-ui/styles.css");

const Navbar = () => {
    return (
        <Content/>
    );
};


const Content = () => {

    const toggle = document.querySelector('#toggle')
    const body = document.body

    const wallet = useAnchorWallet()

    const themeChange = () => {
        body.classList.toggle('dark')
        toggle?.classList.toggle('toggle')
        changeSrc()
    }

    const changeSrc = () => {
        const avatar = document?.getElementsByClassName("avatar") as unknown as HTMLImageElement;
        avatar.src = dark_profile
    }

    const [users, setUsers] = useState<ProfileModel[]>([]);
    const [load, setLoad] = useState(false);
    const [showWalletButton, setshowWalletButton] = useState(false);
    const [showProfileIcon, setshowProfileIcon] = useState(false);

    async function fetchUsers(pub: any) {
        // @ts-ignore
        FetchProfiles([creatorFilter(pub.toBase58())])
            .then((fetchProfiles: any) => {
                setUsers(fetchProfiles)
                console.log(fetchProfiles)
            })
            .finally(() => {
            })
    }

    useEffect(() => {
            // wallet connected
            if (wallet) {
                const pub = wallet.publicKey
                console.log(pub)

                if (!load) {
                    fetchUsers(pub).then(() => console.log(users))
                    setLoad(true);
                }
                // @ts-ignore once connected hide the wallet button
                // document.getElementsByClassName('wallet')[0].style.visibility = 'hidden';
                setshowWalletButton(false);
                // profile exists
                if (users.length >= 1) {
                    // TODO add profile icon
                    // @ts-ignore show the create profile
                    // document.getElementsByClassName('create-profile')[0].style.visibility = 'hidden';
                    setshowProfileIcon(false);
                } else {
                    // @ts-ignore show the create profile
                    // document.getElementsByClassName('create-profile')[0].style.visibility = 'visible';
                    setshowProfileIcon(true);
                }

            } else {
                // @ts-ignore once connected hide the wallet button
                // document.getElementsByClassName('wallet')[0].style.visibility = 'visible';
                setshowWalletButton(true);
                // @ts-ignore hide the create profile button if not connected
                // document.getElementsByClassName('create-profile')[0].style.visibility = 'hidden';
                setshowProfileIcon(false);
            }
        }
        ,
        [wallet]
    )
    ;

    return (
        <div>
            <header id="header"><a className="brand" href="/#">
                <img src="/images/logo.png" alt=""/>
            </a>
                <nav>
                    <ul className="nav">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/explore">Explore</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/">About</Link></li>
                    </ul>
                    <div className="hamburger">
                        <div className="line1"/>
                        <div className="line2"/>
                        <div className="line3"/>
                    </div>
                </nav>
                <div className="switch-content">
                    <button className="switch" type="button" id="toggle" onClick={themeChange}>
                        <span className="sun">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"/>
                            </svg>
                        </span>
                        <span className="moon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"/>
                            </svg>
                        </span>
                    </button>
                </div>
                {showWalletButton && <div style={{ marginRight: 10 }}>
                    <WalletMultiButton className="wallet"/>
                </div>}
                {showProfileIcon && <Link to={"/create-profile/" + wallet?.publicKey}>
                    <div style={{ marginRight: 10 }}>
                        {users.length >= 1 ? 
                        <div style={{ borderRadius: "50%" }}>
                            <img src="/images/sample profile pic.jpg" style={{ width: 50, height: 50 }} />
                        </div>
                        : <Button variant="contained" className="create-profile">Create Profile</Button>
                        }
                    </div>
                </Link>}
                
            </header>
        </div>
    );
}

export default Navbar;