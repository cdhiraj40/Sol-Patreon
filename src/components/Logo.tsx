import React from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import "./styles/Logo.css";

const Logo = () => {
  return (
    <div className="flex-row">
      <MonetizationOnIcon className="logo-icon white-text" />
      <div className="logo-text-container">
        <h2 className="white-text">Sol-Patreon</h2>
      </div>
    </div>
  )
}

export default Logo;