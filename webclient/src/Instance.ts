import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { createStore, combineReducers, Store, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { buildReducers, IAppState } from './kevin_reducers';
import { GetJSON, PostJSONData } from './Fetch'
import * as moment from 'moment';
import * as wsconn from './WSConn'
import { HashRouter, Route } from 'react-router-dom';

// react components
import { leadsView } from './LeadsView'
import { menuBar } from './MenuBar'
import { navBar } from './NavBar'
import { priceSheet } from './PriceSheetView'
import { contract } from './ContractView'

//hyperscript
import * as h from 'react-hyperscript';
//import * as H from 'hyperscript';
import hh from './hh';
const { ul, li, a, div, tr, td, table, tbody, h4, img, p, span, pre, input } = hh( h );
//const { a : A, p : P, pre: PRE, div : DIV, table : TABLE, tbody : TBODY, tr : TR, td : TD  } = hh( H );

export interface InstanceContext {
        instance : Instance;
}

declare global {
        interface Window {
                RInstance : any;
                devToolsExtension : any;
                __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : any;
        }
}
export var RInstanceContext = React.createContext< InstanceContext >( { instance: null } );

function loadLeads( instance ) {
	GetJSON( "/api/leads", ( o ) => {
		instance.store.dispatch( { type: "FETCHEDLEADS", payload: o } )
	}, ( err ) => {} );
}

function getCurrentUser( instance ) {
	GetJSON( "/api/getCurrentUser", ( o ) => {
		instance.store.dispatch( { type: "SETCURRENTUSER", payload: o } )
	}, ( err ) => {} );
}

function makeWSMessageHandler( instance : any )
{
	return function( data :any )
	{
		instance.store.dispatch(  { type: "NEWMESSAGEFROMSERVER", payload: JSON.parse( data.data ) } )
	}
}

export class Instance
{
	store : Store< IAppState >;

	constructor()
	{
		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		this.store = createStore( buildReducers(), undefined, composeEnhancers( applyMiddleware( ( store : Store< IAppState > ) => next => action => {
			const prevState : IAppState = store.getState();
			const ret = next( action )

			if ( action.type == "SENDMESSAGE" )
			{
				PostJSONData( "/api/sendMessage", { 
					conversation_uuid: prevState.ui.activeLead,
					to_uuid: prevState.ui.activeLead,
					from_uuid: prevState.user.uuid,
					from_str: prevState.user.name,
					message: prevState.ui.messageBox,
					//timestamp: moment().toISOString()
					timestamp: moment().format( "YYYY-MM-DD[T]hh:mm:ss" )
				}, ( o ) => {}, () => {} );
			}
			else if ( action.type == "SUBMITADDNEWUSER" )
			{
			    PostJSONData( "/api/addNewUser", { 
				username: prevState.ui.addNewUserFields.username,
				password: prevState.ui.addNewUserFields.password,
			    }, ( o ) => {}, () => {} );
			}
			return ret;
		} ) ) );

		getCurrentUser( this )
		loadLeads( this )
		var wss_server_url = window.location.protocol.replace(/http/, 'ws') + window.location.host;
		wsconn.createConnection( wss_server_url, makeWSMessageHandler( this ) )
		ReactDOM.render(
			h( RInstanceContext.Provider, { value: { instance: this } }, [
				h( Provider, { store: this.store }, [
				    h( navBar ),
					//h( menuBar ),
					div( { style: { display: "flex" } }, [
					h(HashRouter, [
						h(Route, { exact:true, path:"/", component: leadsView } ),
						h(Route, { exact:true, path:"/leads", component: leadsView } ),
						//h(Route, { exact:true, path:"/jobs" component: jobsView } ),
						h(Route, { exact:true, path:"/contract", component: contract } ),
						h(Route, { exact:true, path:"/pricesheets", component: priceSheet } )
					])
					])
					//h( leadsView )
					//h( ConnectedRouter, { history: history, store: this.store }, [
//					h( DragDropContextProvider, { backend: HTML5Backend }, [
//						h( FlashComp ),
//						h( SpinnerComp ),
//						h( TranslatorInputComponent, { instance: this } ),
//						h( VisibleComponent(
//							CreateLatticeComponent,
//							(state) => {return state.createLattice.visible},
//						)),
//						h( VisibleComponent(
//							CubitImportComponent,
//							(state) => {return state.cubitImport.visible},
//						)),
//						h( MiniBufferComp, { instance: this } ),
//						h( RootReduxContainer( <any>ShowModel ), { instance: this } )
//					])
					//])
				]),
			]),
			document.querySelector( "#main" )
		);
	}
}
