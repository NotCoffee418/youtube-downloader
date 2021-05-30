import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components (individually? is this right?)
import HistoryBox from './components/HistoryBox'
import DownloadBox from './components/DownloadBox'

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