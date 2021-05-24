import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components (individually? is this right?)
import HistoryBox from './components/HistoryBox/HistoryBox'


function refreshHistory() {

    const element = <HistoryBox />;
    ReactDOM.render(element, $("#root").get(0));
}

// Load elements
refreshHistory();