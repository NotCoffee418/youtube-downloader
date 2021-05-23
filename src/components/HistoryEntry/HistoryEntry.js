import React, { Component } from 'react';
export default class VideoEntry extends React.Component {

    constructor() {
        super();
        this.state = {
            title: "-- UNKNOWN TITLE --",
            savedAs: "MPx",
            fileSize: "x MB",
            savePath: "INVALID PATH",
            sourceUrl: "INVALID URL"
        };
    }

    render() {
        return (
            <h1>this is an entry {this.props.title}</h1>
        )
    }
}