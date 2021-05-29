import React, { Component } from 'react';

export default class HistoryEntry extends React.Component {

    constructor() {
        super();
        this.state = {
            title: "-- UNKNOWN TITLE --",
            savedAs: "MPx",
            fileSize: "x MB",
            saveDir: "INVALID PATH",
            sourceUrl: "INVALID URL",
            duration_seconds: "SECONDS",
        };
    }

    render() {
        return (
            <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">{this.props.title}</h6>
                    <small>{this.props.savedAs}</small>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <small>{this.props.fileSize}</small>
                    <div>
                        <button onClick={() => this.openExternal(this.props.sourceUrl)} type="button" className="btn btn-primary btn-sm">Source</button>
                        {this.props.saveDir == null ? (
                            <button disabled="disabled" type="button" className="btn btn-primary btn-sm m-1">Show in folder</button>
                        ) : (
                            <button onClick={() => require('child_process').exec('start "" "' + this.props.saveDir + '"')} type="button" className="btn btn-primary btn-sm m-1">Show in folder</button>
                        )}
                    </div>
                </div>
            </a >
        )
    }

    openExternal(thepath) {
        require('electron').shell.openExternal(thepath);
    }


}