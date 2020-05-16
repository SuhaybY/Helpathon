import React, { useState, useRef } from 'react';
import {useParams} from "react-router-dom";
import logo from '../logo.svg';
import { GetUsers } from './'

export default function ViewHackathon() {
    let { hackID } = useParams();
    console.log("Obtained ID: " + hackID + " from URL");

    return (
    <div className="App">
      <header className="App-header">
        Hackathon ID: {hackID}
        <GetUsers />
      </header>
    </div>
    );
}