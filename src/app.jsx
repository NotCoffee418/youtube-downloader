import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components (individually? is this right?)
import HistoryBox from './components/HistoryBox/HistoryBox'
import DownloadBox from './components/DownloadBox/DownloadBox'

function renderDownloadBox() {
    const element = <DownloadBox />;
    ReactDOM.render(element, $("#downloadBox").get(0));
}

function refreshHistory() {
    const element = <HistoryBox />;
    ReactDOM.render(element, $("#historyBox").get(0));
}

// Load elements
renderDownloadBox();
refreshHistory();