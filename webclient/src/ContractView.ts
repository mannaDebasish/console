import * as React from "react";
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import * as h from 'react-hyperscript';
import * as PriceSheet from './PriceSheetView'
import { useState } from 'react';

function initialState()
{
  var rows = PriceSheet.sheet()
  for( let x of rows )
  {
    x[ 'qty' ] = 0
    x[ 'total' ] = 0
  }
  return rows;
}
const columns = [
  { key: 'id', name: 'ID', resizable:true, width:200 },
  { key: 'name', name: 'Title', resizable:true, width:200  },
  { key: 'unit_price', name: 'UnitPrice', resizable:true, width:30, editable:true   },
  { key: 'qty', name: 'Quantity', resizable:true, width:30, editable:true  },
  { key: 'total', name: 'Total', resizable:true, width:30, editable:true  }
];

export function contract() {
  const [rows, setRows] = useState( initialState() );
  return (h(ReactDataGrid, { style: {height:"90vh"}, columns:columns, rows:rows, rowsCount:3, minHeight:150, onGridRowsUpdated: ({ fromRow, toRow, updated }) => {
    console.log( fromRow, toRow, updated )
    var nrows = []
    const orows = rows.slice();
    for (let i = fromRow; i <= toRow; i++) {
      nrows[i] = { ...orows[i], ...updated };
    }
    setRows( nrows );
  } } ) )
}
