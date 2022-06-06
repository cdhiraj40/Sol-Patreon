import React, {useState} from "react";
import "./styles/Home.css";
import About from "../components/About";
import {FetchProfiles} from "../api/fetchProfiles";
import {ProfileModel} from "../api/ProfileModel";
import {Link} from "react-router-dom";

const Home: React.FC = () => {
    const [data, setData] = useState<ProfileModel[]>([]);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<ProfileModel[]>([]);

    const updateData = async (query: any) => {
        setSearch(query);

        const newData = users.filter((element) => {
            const username = element.username.toLowerCase();
            const name = element.name.toLowerCase();
            return username.includes(query) || name.includes(query);
        })
        await setData(newData);
    }

    async function fetchUsers() {
        FetchProfiles()
            .then((fetchProfiles: any) => setUsers(fetchProfiles))
            .finally(() => {
            })
    }

    return (
        <>
            <form action="/" method="get">
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search users</span>
                </label>
                <div>
                    <img className="Searching" src="https://buildingoutloud.solana.com/images/finalist-gradient.png"
                         alt=""/>
                    <div className="search-bar">

                        <input
                            type="text"
                            id="header-search"
                            placeholder="Search Users"
                            name="s"
                            onChange={(e) => {
                                updateData(e.target.value).then()
                            }}

                            onFocus={() => {
                                fetchUsers().then()
                            }
                            }
                        />
                        {/*<button type="submit">Go!</button>*/}

                    </div>
                </div>

            </form>
            <div className="profile_wrapper">
                <ul className="profile_items">
                    {
                        (search !== "") ? (data.map(
                                (user) => (
                                    <Link className="nav-link" to={"/profile/" + user.publicKey}>
                                    <li>{user.username} {user.name}</li>
                                    </Link>
                                )
                            )
                        ) : ""
                    }
                </ul>
            </div>
            <About/>
        </>
    );
}

export default Home;