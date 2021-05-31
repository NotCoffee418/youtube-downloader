import React, { Component } from 'react';
import { textSpanEnd } from 'typescript';
import { Settings } from '../logic/settings'
import { Downloader } from '../logic/downloader'

export default class DownloadBox extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }



    render() {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    onClick={this.startDownload()}>
                    Download
                </button>
                auto download checkbox go here
            </div>
        );
    }


    startDownload() {
        var downloader = new Downloader();
        downloader.addDownloadRequest("https://www.youtube.com/watch?v=9tp50icGhX8", Downloader.downloadType.VIDEO);

    }
}