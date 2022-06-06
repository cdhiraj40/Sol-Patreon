import React from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import "./styles/Logo.css";

const Logo = (props: any) => {
  return (
    <div className="flex-row">
      <MonetizationOnIcon className={`logo-icon ${props.color}`} />
      <div className="logo-text-container">
        <h2 className={props.color}>Sol-Patreon</h2>
      </div>
    </div>
  )
}

export default Logo;