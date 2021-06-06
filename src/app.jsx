import React, { Component } from 'react';
import { Database } from './logic/database'
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
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

// Prepare database
var client = new Database();


// Load elements
renderDownloadBox();
refreshHistory();