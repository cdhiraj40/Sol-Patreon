import "./Navbar.css"
import light_profile from "./assets/light_profile.png"
import dark_profile from "./assets/dark_profile.png"
require("@solana/wallet-adapter-react-ui/styles.css");

const Navbar = () => {

    const toggle = document.querySelector('#toggle')
    const body = document.body

    const themeChange = () => {
        body.classList.toggle('dark')
        toggle?.classList.toggle('toggle')
        changeSrc()
    }

    const changeSrc = () => {
        const avatar = document?.getElementsByClassName("avatar") as unknown as HTMLImageElement;
        avatar.src = dark_profile
    }

    return (
        <div>
            <header id="header"><a className="brand" href="#">Sol-Patreon</a>
                <nav>
                    <ul className="nav">
                        <li className="nav-item"><a className="nav-link" href="#/">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#/">Explore</a></li>
                        <li className="nav-item"><a className="nav-link" href="#/">About</a></li>
                    </ul>

                </nav>
                <div className="switch-content">
                    <button className="switch" type="button" id="toggle" onClick={themeChange}>
                        <span className="sun">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path>
                            </svg>
                        </span>
                        <span className="moon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </header>
            <div className="content"></div>

        </div>
    );
}

export default Navbar;