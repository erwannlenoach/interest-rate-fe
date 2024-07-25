"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";
import EditPassword from "../edit-password/page";
import ConnexionInfo from "../connexion-info/page";

const UserInfo = ({ user }) => {
  const { token } = useAuth();

  console.log(user)

  return (
    <div className="user-info-container uk-container">
      <h2 className="uk-heading-small uk-text-center uk-padding">
        Personal Information
      </h2>
      <div
        className="uk-grid-medium uk-child-width-expand@s uk-grid-divider"
        data-uk-grid
      >
        <ConnexionInfo user={user} />
        <EditPassword user={user} token={token} />
      </div>
    </div>
  );
};

export default UserInfo;
