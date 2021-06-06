import React, { Component } from 'react';
import { textSpanEnd } from 'typescript';
import { Settings } from '../logic/settings'
import { Downloader } from '../logic/downloader'

export default class DownloadBox extends React.Component {
    constructor(props) {
        super(props);
        this.startDownload = this.startDownload.bind(this);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <button
                    id="downloadBtn"
                    type="button"
                    className="btn btn-lg btn-primary"
                    onClick={this.startDownload}>
                    Download
                </button>
                auto download checkbox go here
            </div>
        );
    }


    async startDownload() {
        console.log("start");
        var downloader = new Downloader();
        await downloader.addDownloadRequest("https://www.youtube.com/watch?v=9tp50icGhX8", Downloader.downloadType.AUDIO_ONLY);
        console.log("stop");

    }
}