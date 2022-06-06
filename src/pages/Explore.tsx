import React, {useState} from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import "./styles/Explore.css";
import {Profile} from "../api/Profile";
import {FetchProfiles} from "../api/fetchProfile";
import {Link} from "react-router-dom";

const Explore: React.FC = () => {
    const [users, setUsers] = useState<Profile[]>([]);
    const [load, setLoad] = useState(false);
    const [count, setCount] = useState(0);

    async function fetchUsers() {
        FetchProfiles()
            .then((fetchProfiles: any) => {
                setUsers(fetchProfiles)
                console.log(fetchProfiles)
            })
            .finally(() => {
            })
    }

    if (!load) {
        fetchUsers().then(() => console.log(users))
        setLoad(true)
    }

    const countAmount = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>Explore</h1>

            <div>
                <div className="bg-image-container">
                    <img src="./images/explore page background.jpg" className="bg-image"/>
                </div>
                <div className="bg-text">
                    <h1>Search bar</h1>
                </div>
            </div>

            <div className="flex-row">
                <Grid container alignItems="center" style={{width: "90%"}}>
                    {Array(users.length).fill(0).map((e, i) => (
                        <Grid item md={4} sm={6} xs={12}>
                            <div className="card">
                                <Grid container alignItems="center">
                                    <Grid item lg={6} xs={12}>
                                        <div>
                                            <img src="./images/sample profile pic.jpg" className="profilepic"
                                                 alt="sample profile picture"/>
                                            <h5>{users[i].description}</h5>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} xs={12} justifyContent="center" alignItems="center">
                                        <div>
                                            <h2>{users[i].name}</h2>
                                            <h5>{users[i].username}</h5>
                                        </div>
                                        <Link className="nav-link" to={"/profile/" + users[i].publicKey}>
                                            <Button variant="contained" color="error">Profile</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Explore;