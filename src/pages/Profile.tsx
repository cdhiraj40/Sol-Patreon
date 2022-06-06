import React, {useState} from "react";
import "./styles/Profile.css";
import DonateCard from "../components/DonateCard";
import {FetchProfile} from "../api/fetchProfile";
import {PublicKey} from "@solana/web3.js";
import {ProfileModel} from "../api/ProfileModel";

const Profile = () => {

    const [user, setUser] = useState<ProfileModel>();
    const [load, setLoad] = useState(false);
    const pageUrl = window.location.href

    const publicKey = new PublicKey(pageUrl.substring(pageUrl.length - 44))

    async function fetchUser() {
        FetchProfile(publicKey)
            .then((fetchProfile: any) => {
                setUser(fetchProfile)
                console.log(fetchProfile)
            })
            .finally(() => {
            })
    }

    if (!load) {
        fetchUser().then(() => console.log("lol", user?.bannerUrl))
        setLoad(true)
    }
    return (
        <>
            <div className="banner-container">
                <img src={user?.personalUrl} className="banner"/>
                <div className="profilepic-container">
                    <img src={user?.picUrl} className="profilepic"/>
                </div>
            </div>
            <br/>
            <h2>{user?.username}</h2>
            <h2>{user?.name}</h2>
            <p>{user?.description}</p>
            <div className="subs_card_wrapper">
                <DonateCard donate={"0.1"} name={"Level 1"}/>
                <DonateCard donate={"0.5"} name={"Level 2"}/>
                <DonateCard donate={"1"} name={"Level 3"}/>
            </div>
        </>
    );
}

export default Profile;