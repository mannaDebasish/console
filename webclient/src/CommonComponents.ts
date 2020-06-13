import { connect, ConnectedComponentClass } from 'react-redux';
import * as React from "react";
import * as h from 'react-hyperscript';
import hh from './hh';
const { ul, li, a, div, tr, td, table, tbody, h4, img, button, input } = hh( h );

export const ModalDialog = connect< {}, {}, any >( null, null )( ( props : any ) => {
    return div( { style: { opacity: 1 }, className: "ModalDialog", onClick: props.onClickHandler }, props.children );
} )
