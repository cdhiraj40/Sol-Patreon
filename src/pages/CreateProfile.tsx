import React, {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import "./styles/EditProfile.css";
import CreateProfile from "../api/createProfile";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import GetProvider from "../api/getProvider";
import {PublicKey} from "@solana/web3.js";

const EditProfile = () => {
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [profilePictureURL, setProfilePictureURL] = useState<string>("");
    const [bannerURL, setBannerURL] = useState<string>("");
    const [websiteURL, setWebsiteURL] = useState<string>("");
    const [newProfilePub, setNewProfilePub] = useState<PublicKey>();

    const wallet = useAnchorWallet()
    const provider = GetProvider(wallet)

    const validation = () => {
        return (!username || !name || !description || !profilePictureURL || !bannerURL || !websiteURL);
    }

    useEffect(() => {
            // transaction completed
            if (newProfilePub) {
                window.location.href = `http://localhost:3001/profile/${newProfilePub}`;
            }
        },
        [newProfilePub]
    );

    async function onCreateProfile() {
        if (provider) {

            const profilePub = await CreateProfile(provider, username, name, description,
                profilePictureURL, bannerURL, websiteURL)

            if (profilePub) {
                setNewProfilePub(profilePub)
            }

        } else {
            console.log("ASd")
            // wallet not connected
        }
    }

    return (
        <>
            <div className="card editprofile-card">
                <h2>Create your profile</h2>
                <br/>
                <Grid container spacing={6}>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            id="filled-basic"
                            label="Username*"
                            variant="filled"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            id="filled-basic"
                            label="Name*"
                            variant="filled"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            id="filled-basic"
                            label="Description*"
                            variant="filled"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            id="filled-basic"
                            label="Profile picture URL*"
                            variant="filled"
                            value={profilePictureURL}
                            onChange={(e) => setProfilePictureURL(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            id="filled-basic"
                            label="Banner URL*"
                            variant="filled"
                            value={bannerURL}
                            onChange={(e) => setBannerURL(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            id="filled-basic"
                            label="Personal URL*"
                            variant="filled"
                            value={websiteURL}
                            onChange={(e) => setWebsiteURL(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <Button variant="contained" color="error" disabled={validation()}
                        onClick={onCreateProfile}>Submit</Button>
                <br/>
            </div>
        </>
    );
}

export default EditProfile;