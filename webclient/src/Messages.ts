import { connect } from 'react-redux';
import * as h from 'react-hyperscript';
import hh from './hh';
import * as moment from 'moment';
import { IAppState } from './reducers'
const { div, button, textarea } = hh( h );
import { sendMessage, messageChange } from './actions'


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

const Message = connect< {}, {}, any >( null, null )( ( props : any ) => {
    return div( { className: "message", style: { display: "flex", ...flex_col, alignItems: mineOrTheirs( props ) } }, [
        div( { className: "msg_header", style: { ...flex_row, display: "inline-flex", justifyContent: "space-between" } }, [
            div( { className: "fromstr", style: { ...flex_left, fontSize: "0.55em" } }, props.from_str ),
            div( { style: { fontSize: "0.55em" } }, " - " ),
            div( { className: "date", style: { ...flex_right, fontSize: "0.55em" } }, moment( props.timestamp ).calendar() )
        ]),
        div( { className: "messagetext", style: { ...message_sty, ...bubbleColor( props ), display: "inline-block" } }, props.message )
    ])
});

export const Messages = connect< {}, {}, any >( 
  ( state :IAppState ) => { return { activeMessages: state.ui.activeMessages, message_editor: state.ui.messageBox } }, 
  { messageChange, sendMessage })( ( props : any ) => {
    return div( { className:"messages", onClick:(e)=>e.stopPropagation()},[
        div( { className:"messagelist", style: 
            { display: "flex", flexDirection: "column" } }, props.activeMessages.map( x => h( Message, x ) ) ),
        div( { className:"message__box", style: { display: "flex", flexDirection: "column" } },[
          textarea( { value: props.message_editor, onChange: ( e ) => props.messageChange( e.target.value ) } ),
            button( { type: "button", onClick: props.sendMessage },["Send"])
        ]),
    ]);
})
