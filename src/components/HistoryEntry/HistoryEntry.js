import React, { Component } from 'react';

export default class HistoryEntry extends React.Component {

    constructor() {
        super();
        this.state = {
            title: "-- UNKNOWN TITLE --",
            savedAs: "MPx",
            fileSize: "x MB",
            savePath: "INVALID PATH",
            sourceUrl: "INVALID URL",
            duration_seconds: "SECONDS",
        };
    }

    render() {
        return (
            <a class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{this.props.title}</h5>
                    <small>3 days ago</small>
                </div>
                <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                <small>Donec id elit non mi porta.</small>
            </a>
        )
    }
}