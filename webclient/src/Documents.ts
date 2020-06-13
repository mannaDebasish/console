import { connect } from 'react-redux';
import * as h from 'react-hyperscript';
import hh from './hh';
import * as moment from 'moment';
import { IAppState } from './reducers'
const { div, button, textarea } = hh( h );
import { sendMessage, messageChange, activePDFDocumentChange } from './actions'
import PDFViewer from './PDFViewer'


//https://codepen.io/swards/pen/gxQmbj
const flex_col = { flexDirection: "column" }
const flex_row = { flexDirection: "row" }
const flex_left = { alignItems: "flex-start" }
const flex_right = { alignItems: "flex-end" }
const message_sty = {
  borderRadius: "20px",
  padding: "8px 15px",
  marginTop: "5px",
  marginBottom: "5px",
}

function mineOrTheirs( props )
{
    return props.conversation_uuid == props.from_uuid ? "flex-end" : "flex-start";
}

function bubbleColor( props )
{
    return props.conversation_uuid == props.from_uuid ? 
        { 
            color: "white",
            background: "linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%)",
            marginLeft: "25%",
            textAlign: "right"

        }
        :
        {
            color: "white",
            backgroundColor: "green",
            background: "linear-gradient(to bottom, #00EAD0 0%, #00D185 100%)",
            marginRight: "25%"
        };

}

const Message = connect< {}, {}, any >( null, 
  {
    activePDFDocumentChange
  }
)( ( props : any ) => {
    return div( { className: "message", style: { display: "flex", ...flex_col, alignItems: mineOrTheirs( props ) } }, [
        div( { className: "msg_header", style: { ...flex_row, display: "inline-flex", justifyContent: "space-between" } }, [
            div( { className: "fromstr", style: { ...flex_left, fontSize: "0.55em" } }, props.from_str ),
            div( { style: { fontSize: "0.55em" } }, " - " ),
            div( { className: "date", style: { ...flex_right, fontSize: "0.55em" } }, moment( props.uploadDate ).calendar() )
        ]),
      button( { onClick: () => 
        {
          props.activePDFDocumentChange( { url: window.location.origin + `/api/leads/document/${props.leadid}/${props.uuid}` } )
          /*
          fetch( `/api/leads/document/${props.leadid}/${props.uuid}`, {
            credentials: "same-origin",
            method: 'GET',
          }).then( function( response ) {
            if( response.ok ) {
              response.arrayBuffer().then( ( buf ) => {
                console.log( buf )
                props.activePDFDocumentChange( buf ) } )
              }
          }).catch( function( err ) {
            console.log( "error getting document" , err )
          });
        */
        } 
      })
    ])
});

export const Documents = connect< {}, {}, any >( 
  ( state :IAppState ) => { return { activeDocuments: state.ui.activeDocuments, message_editor: state.ui.messageBox } }, 
  { messageChange, sendMessage })( ( props : any ) => {
    return div( { className:"documents", onClick:(e)=>e.stopPropagation()},[
        div( { className:"messagelist", style: 
          { display: "flex", flexDirection: "column" } }, props.activeDocuments.docs.map( x => h( Message, x ) ) ),
        h( PDFViewer )
        ])
})
