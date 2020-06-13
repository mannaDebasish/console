import { connect, useSelector, useDispatch } from 'react-redux';
import {useEffect, useRef, useState, useCallback } from "react";
import * as React from "react";
import * as _ from 'lodash';
import * as h from 'react-hyperscript';
import hh from './hh';
import { IAppState } from './reducers'
const { a, div, label, h2, button, textarea, input, select, option, table, tbody, tr, td, th, span, pre, datalist } = hh( h );
import { GetJSON } from './Fetch'
import { RInstanceContext} from './Instance'
import { FaGlobe } from "react-icons/fa"
import './main.css'
import { ModalDialog } from './CommonComponents'
import { openAddNewUser, closeAddNewUser, submitAddNewUser, changedAddNewUser } from './actions'

export const menuBar = connect( ( state : IAppState ) => {
  return { leads: state.leads.leads, photos: state.leads.photos, ui: state.ui };
}, { closeAddNewUser, openAddNewUser, submitAddNewUser, changedAddNewUser } )( ( props ) => {
    const instance = React.useContext(RInstanceContext).instance
    return div( [ div( [ button( { onClick: props.openAddNewUser }, [ "Add Console User" ] ) ] ),
		  ( props.ui.openAddNewUser ? h( ModalDialog, { onClickHandler: props.closeAddNewUser }, [
		      div( { onClick:(e)=>e.stopPropagation() }, [
			  div( [
			      span( [ "Username", input( { onChange: ( e ) => props.changedAddNewUser( "username", e.value ) } ) ] ),
			  ]),
			  div( [
			      span( [ "Password", input( { type: "password", onChange: ( e ) => props.changedAddNewUser( "password", e.value ) } ) ] ),
			  ]),
			  button( { onClick: props.submitAddNewUser }, "Create User" )
		      ])
		  ] ) : null ) ] );
});
