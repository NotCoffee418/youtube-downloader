import React, { Component } from 'react';
import HistoryEntry from '../HistoryEntry/HistoryEntry'
import { Database } from '../../logic/database'

export default class HistoryBox extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const client = new Database();
        client.open();
        var historyData = client.db.prepare(
            "SELECT * FROM download_history ORDER BY id DESC").all();
        client.close();

        const byteSize = require('byte-size');
        const path = require("path");

        return (
            <div className="row">
                <div className="col-12">
                    <div className="list-group">
                        {historyData.map((r, i) => {
                            // Determine displayable file size
                            var rs = byteSize(r.filesize);
                            var sizeStr = rs.value + " " + rs.unit;

                            // Determine directory
                            var cSaveDir = null;
                            if (r.save_path != null) {
                                cSaveDir = path.dirname(r.save_path);

                                // if invalidpath, also make null
                                if (cSaveDir == '.')
                                    cSaveDir = null;
                            }

                            return (<HistoryEntry key={"historyEntry_" + i} title={r.title} savedAs={r.file_format} fileSize={sizeStr}
                                sourceUrl={r.source_url} saveDir={cSaveDir} duration_seconds={r.duration_seconds} />)
                        })}
                    </div>
                </div>
            </div>
        )
    }


    componentDidCatch(error, info) {
        console.log(error);
    }
}