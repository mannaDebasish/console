import { connect, useSelector, useDispatch } from 'react-redux';
//import { connect, useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState, useCallback } from "react";
import * as React from "react";
import * as _ from 'lodash';
import * as H from 'hyperscript';
import * as h from 'react-hyperscript';
import hh from './hh';
import { IAppState } from './reducers'
console.log(hh)
const { a, div, label, h2, button, textarea, input, select, option, table, tbody, tr, td, th, span, pre, datalist } = hh(h);
import { GetJSON, PostJSONData } from './Fetch'
import { RInstanceContext } from './Instance'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { FaGlobe } from "react-icons/fa"
import './main.css'
import { ModalDialog } from './CommonComponents'
import { Messages } from './Messages'
import { Documents } from './Documents'
import * as base64js from 'base64-js'
import { v4 as uuid } from 'uuid';

function gallery(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  let children = viewerIsOpen ? h(Modal, { onClose: closeLightbox }, [h(Carousel, { currentIndex: currentImage, views: props.photos.map(x => ({ ...x, srcset: x.srcSet, captions: x.title })) })]) : null;
  return div([h(Gallery, { photos: props.photos, onClick: openLightbox }),
  h(ModalGateway, children)])
}
function dropdown(props: any) {
  return select([_.map(props.options, (x) => option({ key: x }, x))])

}
export const leadsView = connect((state: IAppState) => {
  return { leads: state.leads.leads, photos: state.leads.photos, ui: state.ui };
}, {})((props) => {
  const instance = React.useContext(RInstanceContext).instance
  function popupPictures(uuid) {
    GetJSON("/api/leads/photos/" + uuid, (o) => {
      instance.store.dispatch({ type: "FETCHEDLEADPHOTOS", payload: _.map(o.docs, (x) => { return { width: 1, height: 1, src: "/api/photo/" + x.uuid }; }) });
    }, (err) => { });
  }
  function popupMessages(uuid) {
    GetJSON("/api/leads/messages/" + uuid + "/0", (o) => {
      instance.store.dispatch({ type: "FETCHEDLEADMESSAGES", payload: o, activeLead: uuid });
    }, (err) => { });
  }
  function popupDocuments(uuid) {
    GetJSON("/api/leads/documents/" + uuid, (o) => {
      instance.store.dispatch({ type: "FETCHEDLEADDOCUMENTS", payload: o, activeLead: uuid });
    }, (err) => { });
  }
  function binaryFileUpload(callback) {
    const input = H('input', {
      type: "file", onchange: function (e: Event) {
        var file = input.files[0];
        var reader: any = new FileReader();

        reader.addEventListener("load", callback);
        reader.filename = input.value; 4

        if (file) {
          reader.readAsArrayBuffer(file);
        }
      }
    });
    input.click(); // opening dialog
  }
  function uploadPhoto(leaduuid) { binaryFileUpload((filedata) => { PostJSONData("/lead/attachPhoto", { uuid: uuid(), caption: '', leadid: leaduuid, photo: base64js.fromByteArray(new Uint8Array(filedata.target.result)) }, (o) => { alert("Photo Added") }, (err) => { }); }) }
  function uploadDocument(leaduuid) { binaryFileUpload((filedata) => { PostJSONData("/api/lead/addDocument", { uuid: uuid(), leadid: leaduuid, data: base64js.fromByteArray(new Uint8Array(filedata.target.result)) }, (o) => { alert("Document Added") }, (err) => { }); }) }
  function buildMapsUrl(gps) {
    function decToDMS(dec) {
      let deg = Math.trunc(dec)
      let md = Math.abs(dec - deg) * 60
      let min = Math.trunc(md)
      let sd = Math.abs(md - min) * 60
      return [deg, min, sd]
    }
    function formatLat(dms) {
      return `${Math.abs(dms[0])}°${dms[1]}'${dms[2]}"${(dms[0] < 0) ? 'S' : 'N'}`
    }
    function formatLong(dms) {
      return `${Math.abs(dms[0])}°${dms[1]}'${dms[2]}"${(dms[0] < 0) ? 'W' : 'E'}`
    }
    try {
      let gps_json = JSON.parse(gps)
      return `https://www.google.com/maps/place/${formatLat(decToDMS(gps_json.coords.latitude))},${formatLong(decToDMS(gps_json.coords.longitutde))}`
    }
    catch (error) {
      try {
        let gps_ll = gps.split(/(\s+)/).filter(function (e) { return e.trim().length > 0; }).map((x) => parseFloat(x))
        return `https://www.google.com/maps/place/${formatLat(decToDMS(gps_ll[0]))},${formatLong(decToDMS(gps_ll[1]))}`
        //return "https://www.google.com/maps/@" + gps_json.coords.latitude + "," + gps_json.coords.longitude + "z"
      }
      catch (error) {
        console.log(gps)
        return `https://www.google.com/maps/place/${formatLat(decToDMS(44.263869))},${formatLong(decToDMS(-105.5317173))}`
      }
    }
  }
  function _close() {
    instance.store.dispatch({ type: "CLOSEMESSAGES" });
  }
  return div([table([tbody([tr([th("Salesman"), th("Lead Name"), th("Phone"), th("Email"), th("Status"), th("GPS"), th("Pictures"), th("Messages"), th("Documents"), th("AddDoc1"), th("AddDoc2")]),
  _.map(props.leads, (x, i) => {
    return tr({ key: x.uuid }, [
      td([x.salesman]),
      td([x.name]),
      td([x.phone]),
      td([x.email]),
      td([h(dropdown, { options: ["New", "Contract", "Paid", "Work Finished"] })]),
      td([a({ target: "_blank", href: buildMapsUrl(x.gps) }, [h(FaGlobe), "GPS"])]),
      td([a({ href: "#", onClick: () => { popupPictures(x.uuid) } }, ["Pictures"])]),
      td([a({ href: "#", onClick: () => { popupMessages(x.uuid) } }, ["Messages"])]),
      td([a({ href: "#", onClick: () => { popupDocuments(x.uuid) } }, ["Documents"])]),
      td([button({ onClick: () => { uploadPhoto(x.uuid) } }, ["Upload Photo"])]),
      td([button({ onClick: () => { uploadDocument(x.uuid) } }, ["Upload Document"])]),
    ]
    );
  })])]),
  h(gallery, { photos: props.photos }),
  (props.ui.openMessages ? h(ModalDialog, { onClickHandler: _close }, [h(Messages, { from_uuid: props.ui.activeLead, instance: props.instance })]) : null),
  (props.ui.openDocuments ? h(ModalDialog, { onClickHandler: () => { instance.store.dispatch({ type: "CLOSEDOCUMENTS" }) } }, [h(Documents, { from_uuid: props.ui.activeLead, instance: props.instance })]) : null),
  ]);
});
