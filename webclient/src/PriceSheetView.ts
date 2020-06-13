import * as React from "react";
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import * as h from 'react-hyperscript';
export function sheet()
{
  return [
	{ "id": "tear_off"                 , "name": "Tear off"                                 , "unit_price": 61.35 , "units": "ft^2" } , 
	{ "id": "high"                     , "name": "High"                                     , "unit_price": 3.88  , "units": "ft^2" } , 
	{ "id": "steep"                    , "name": "Steep"                                    , "unit_price": 0     , "units": "ft^2" } , 
	{ "id": "low_slope"                , "name": "Low Slope 2-4/12"                         , "unit_price": 0     , "units": "ft^2" } , 
	{ "id": "layers"                   , "name": "Layers"                                   , "unit_price": 0     , "units": "ft^2" } , 
	{ "id": "overhang"                 , "name": "Overhang"                                 , "unit_price": 0     , "units": "ft^2" } , 
	{ "id": "pitch"                    , "name": "Pitch"                                    , "unit_price": 0     , "units": "ft^2" } , 
	{ "id": "ice_and_water"            , "name": "Ice and water barrier"                    , "unit_price": 1.5   , "units": "ft^2" } , 
	{ "id": "felt"                     , "name": "Roofing felt -Synthetic Underlayment"     , "unit_price": 34.55 , "units": "ft^2" } , 
	{ "id": "shingles"                 , "name": "Shingles"                                 , "unit_price": 245.32, "units": "ft^2" } , 
	{ "id": "starter"                  , "name": "Asphalt Starter"                          , "unit_price": 1.89  , "units": "ft^2" } , 
	{ "id": "hipridge"                 , "name": "Hip & Ridge (Ridge Cap Shingles)"         , "unit_price": 5.91  , "units": "ft^2" } , 
	{ "id": "dripedge"                 , "name": "Rakes (Drip Edge)"                        , "unit_price": 1.98  , "units": "ft^2" } , 
	{ "id": "eaves"                    , "name": "Eaves (Gutter Apron)"                     , "unit_price": 2.09  , "units": "ft^2" } , 
	{ "id": "valley"                   , "name": "Valleys (VAlley Metal)"                   , "unit_price": 4.67  , "units": "ft^2" } , 
	{ "id": "pipejack_1.5_3"           , "name": "Pipe Jack - 1.5-3"                        , "unit_price": 34.26 , "units": "each" } , 
	{ "id": "pipejack_2_4"             , "name": "Pipe Jack - 3-4"                          , "unit_price": 46.83 , "units": "each" } , 
	{ "id": "pipejack_split_boot"      , "name": "Pipe Jack - Split Boot"                   , "unit_price": 67.29 , "units": "each" } , 
	{ "id": "furance_vent"             , "name": "Furnace Vent - Rain cap and storm collar" , "unit_price": 71.79 , "units": "each" } , 
	{ "id": "exhaust_vent_4"           , "name": "Exhaust Vent - through roof - up to 4\""  , "unit_price": 32    , "units": "each" } , 
	{ "id": "exhaust_vent_6_8"         , "name": "Exhaust Vent - through roof - 6-8\""      , "unit_price": 36.75 , "units": "each" } , 
	{ "id": "turtle_vent"              , "name": "Ventilation Type - Turtle Vents"          , "unit_price": 49.52 , "units": "each" } , 
	{ "id": "ridge_vent"               , "name": "Ventilation Type - Ridge Vent"            , "unit_price": 55.57 , "units": "each" } , 
	{ "id": "step_flashing"            , "name": "Step Flashing"                            , "unit_price": 0     , "units": "each" } , 
	{ "id": "headwall_flashing"        , "name": "Headwall Flashing"                        , "unit_price": 0     , "units": "each" } , 
	{ "id": "chimney_flashing"         , "name": "Chimney Flashing"                         , "unit_price": 0     , "units": "each" } , 
	{ "id": "digital_satellite_system" , "name": "Digital Satellite System D&R"             , "unit_price": 29.42 , "units": "each" } , 
	{ "id": "skylight"                 , "name": "Skylight - flat fixed - up to 6 SF - D&R" , "unit_price": 424.41, "units": "each" } 
    ]
}

const rows = sheet()

const columns = [
  { key: 'id', name: 'ID', resizable:true, width:200 },
  { key: 'name', name: 'Title', resizable:true, width:200  },
  { key: 'unit_price', name: 'UnitPrice', resizable:true, width:30   },
  { key: 'units', name: 'Units', resizable:true, width:30  } ];

//const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];

export function priceSheet() {
  return (h(ReactDataGrid, { style: {height:"90vh"}, columns:columns, rows:rows, rowsCount:3, minHeight:150 } ) )
}
