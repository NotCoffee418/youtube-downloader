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

        return (
            <div className="row">
                <div className="col-12">
                    <div className="list-group">
                        {historyData.map((r, i) => {
                            var rs = byteSize(r.filesize);
                            var sizeStr = rs.value + " " + rs.unit;
                            return (<HistoryEntry key={"historyEntry_" + i} title={r.title} savedAs={r.file_format} fileSize={sizeStr}
                                sourceUrl={r.source_url} duration_seconds={r.duration_seconds} />)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}