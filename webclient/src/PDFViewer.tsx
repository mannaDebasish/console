import * as React from 'react'
import { Fragment, Component } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
//import { Document, Page } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import * as h from 'react-hyperscript';
import hh from './hh';
const { p, div, button } = hh( h );


type PDFState = {
  numPages: number,
  pageNumber: number
}

type PDFProps = {
  activePDFDocument: any
}

class PDFViewerComponent extends Component< PDFProps, PDFState > {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  changePage = offset => this.setState( (prevState : PDFState ) => ({
    pageNumber: prevState.pageNumber + offset,
  }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { numPages, pageNumber } = this.state;
    return (
      h( Fragment, [
        h( Document, { file: this.props.activePDFDocument, onLoadSuccess: this.onDocumentLoadSuccess }, [
          h( Page, { pageNumber: pageNumber } )
        ]),
        div( [
          p( `Page ${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'}` ),
          button( { type:"button", disabled: pageNumber <= 1, onClick: this.previousPage }, [ "Previous" ] ),
          button( { type:"button", disabled: pageNumber >= numPages, onClick: this.nextPage }, [ "Next" ] )
          ])
      ])
    );
  }
}

export default connect< {}, {}, any >( 
  ( state ) => { return { activePDFDocument: state.ui.activePDFDocument } },
  null
  )( PDFViewerComponent )

