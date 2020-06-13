import { connect, useSelector, useDispatch } from 'react-redux';
import {useEffect, useRef, useState, useCallback } from "react";
import * as React from "react";
import * as _ from 'lodash';
import * as h from 'react-hyperscript';
import hh from './hh';
import { IAppState } from './reducers'
const { a, div, /* label, h2, button, textarea, input, select, option, table, tbody, tr, td, th, span, pre, datalist */ } = hh( h );
import { GetJSON } from './Fetch'
import { RInstanceContext} from './Instance'
import { FaGlobe } from "react-icons/fa"
import './main.css'
import { ModalDialog } from './CommonComponents'
import { openAddNewUser, closeAddNewUser, submitAddNewUser, changedAddNewUser } from './actions'

export const navBar = connect( ( state : IAppState ) => {
  return { leads: state.leads.leads, photos: state.leads.photos, ui: state.ui };
}, { closeAddNewUser, openAddNewUser, submitAddNewUser, changedAddNewUser } )( ( props ) => {
    const instance = React.useContext(RInstanceContext).instance
    return div( { style: {
      display: "flex",
      flexShrink: 0,
      flexDirection: "column",
      justifyContent: "space-between",
      //height: "100%",	
    }
    },
      [ 
      a( { href: "/#/leads" }, [ "Customers" ] ),
      a( { href: "/#/salesmen" }, [ "Salesmen" ] ),
      a( { href: "/#/constractors" }, [ "Contractors" ] ),
      a( { href: "/#/expenses" }, [ "Expenses" ] ),
      a( { href: "/#/priceSheets" }, [ "PriceSheets" ] )
      ] );
});
