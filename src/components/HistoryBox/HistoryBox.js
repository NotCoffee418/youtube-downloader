import React, { Component } from 'react';
import HistoryEntry from '../HistoryEntry/HistoryEntry'
import { Database } from '../../logic/database'

export default class HistoryBox extends React.Component {
    constructor() {
        super();
        this.state = {
            historyData: null
        };
    }

    render() {
        const client = new Database();
        client.open();
        var historyData = client.db.prepare(
            "SELECT * FROM download_history ORDER BY id DESC").all();
        client.close();

        return (
            <div class="row">
                <div class="col-12">
                    <div class="list-group">
                        {historyData.forEach(r => {
                            <HistoryEntry title={r.title} savedAs={r.file_format} fileSize={r.filesize}
                                sourceUrl={r.source_url} duration_seconds={r.duration_seconds} />
                        })};
                    </div>
                </div>
            </div>
        )
    }
}