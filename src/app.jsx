import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components (individually? is this right?)
import HistoryEntry from './components/HistoryEntry/HistoryEntry'


function refreshHistory() {
    const element = <HistoryEntry title="test title" />;
    ReactDOM.render(element, $("#root").get(0));
}

// Load elements
refreshHistory();