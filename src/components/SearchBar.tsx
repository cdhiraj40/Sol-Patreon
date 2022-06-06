import React, { useState } from "react";
import "../pages/styles/Home.css";
import Data from "./mockdata.json";

const SearchBar = () => {
  const [state, setState] = useState<string>();
  const [data, setdata] = useState(Data);
  const [search, setsearch] = useState("");
  
  const updateData = (ele: string) => {
    setsearch(ele);
    const newData = data.filter((element) => {
      const PostName = element.first_name.toLowerCase();
      const PostLastName = element.last_name.toLowerCase();
      return PostName.includes(ele) || PostLastName.includes(ele);
    })
    setdata(newData);
  }
  
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          id="header-search"
          placeholder="Search Users"
          name="s"
          onChange={(e) => { updateData(e.target.value) }}
        />
        <button>Go!</button>
      </div>
      <div className="profile_wrapper">
        <ul className="profile_items">
          {
            (search != "") ?
              (data.map((item) => (
                <li>{item.first_name} {item.last_name}</li>
              ))
              )
              : ""
          }
        </ul>
      </div>
    </>
  );
}

export default SearchBar;