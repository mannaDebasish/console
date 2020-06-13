import { combineReducers } from 'redux';

export interface IAppState
{
	leads: any,
	ui: any,
	user: any
}


function userReducer( state : any, action : any ) : any
{
	if( ! state )
	{
		return {}
	}

	switch( action.type ) {
		case 'SETCURRENTUSER':
		{
			return { ...state, ...action.payload }
		}
		default:
			return state;
	}
}
function leadsReducer( state : any, action : any ) : any
{
	if( ! state )
	{
		return { leads: [], photos: [], ui: { openMessages: false, activeLead: null } }
	}

	switch( action.type ) {
		case 'FETCHEDLEADS':
		{
			return { ...state, leads: action.payload }
		}
		case 'FETCHEDLEADPHOTOS':
		{
			return { ...state, photos: action.payload }
		}
		default:
			return state;
	}
}

function uiReducer( state : any, action : any ) : any
{
	if( ! state )
	{
		return { 
			openMessages: false, activeLead: null, activeMessages: [], openDocuments: false, activeDocuments: [], messageBox: "", openAddNewUser: false, addNewUserFields: { username: "", password: "" }, 
			activePDFDocument: ''
		}
	}

	switch( action.type ) {
	    case 'OPENADDNEWUSER':
		{
		    return { ...state, openAddNewUser: true }
		}
	    case 'CLOSEADDNEWUSER':
		{
		    return { ...state, openAddNewUser: false }
		}
	    case 'SUBMITADDNEWUSER':
		{
		    return { ...state, openAddNewUser: false }
		}
	    case 'CHANGEDADDNEWUSER':
		{
		    const nv = { ... state.addNewUserFields }
		    nv[ action.payload.fieldname ] = action.payload.value
		    return { ...state, addNewUserFields: nv }
		}
	    case 'CLOSEDOCUMENTS':
		{
		    return { ...state, openDocuments: false, activeDocuments: [] }
		}
	    case 'FETCHEDLEADDOCUMENTS':
		{
		    return { ...state, openDocuments: true, activeDocuments: action.payload, activeLead: action.activeLead }
		}
	    case 'CLOSEMESSAGES':
		{
		    return { ...state, openMessages: false, activeMessages: [] }
		}
	    case 'FETCHEDLEADMESSAGES':
		{
		    return { ...state, openMessages: true, activeMessages: action.payload, activeLead: action.activeLead }
		}
	    case 'SENDMESSAGE':
		{
		    return { ...state, messageBox: "" }
		}
	    case 'MESSAGECHANGE':
		{
		    return { ...state, messageBox: action.payload }
		}
	    case 'NEWMESSAGEFROMSERVER':
		{
		    return { ...state, openMessages: true, activeMessages: [ ...state.activeMessages, action.payload ] }
		}

    	    case "ACTIVEPDFDOCUMENTCHANGE":
		{
		    return { ...state, activePDFDocument: action.payload } 
		}
	    default:
		return state;
	}
}

export function buildReducers() {
	return combineReducers({ leads: leadsReducer, ui: uiReducer, user: userReducer });
}
