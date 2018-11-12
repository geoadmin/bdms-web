import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import LayerGroup from 'ol/layer/Group';
import WMTS from 'ol/source/WMTS';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
// import GeoJSON from 'ol/format/GeoJSON';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';

import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';

import {
  get as getProjection,
  getTransform
} from 'ol/proj';

import {register} from 'ol/proj/proj4';

import proj4 from 'proj4';

import {
  Segment,
  Button
} from 'semantic-ui-react';

const projections = {
  "EPSG:21781": "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs",
  "EPSG:2056": "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs",
  "EPSG:21782": "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=0 +y_0=0 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs",
  "EPSG:4149": "+proj=longlat +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +no_defs",
  "EPSG:4150": "+proj=longlat +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +no_defs"
}

class PointComponent extends React.Component {

  constructor(props) {
    super(props);
    this.changefeature = this.changefeature.bind(this);
    this.styleFunction = this.styleFunction.bind(this);
    this.transform = this.transform.bind(this);
    this.srs = 'EPSG:2056';

    _.forEach(projections, function(proj, srs) {
      proj4.defs(srs, proj);
    });
    register(proj4);

    if(
      _.isNumber(props.x)
      && _.isNumber(props.y)
      && !_.isNil(props.srs)
    ){
      this.state = {
        point: this.transform([props.x, props.y], props.srs),
        toPoint: [props.x, props.y]
      };
    }else{
      this.state = {
        point: null,
        toPoint: null
      };
    }
  }

  transform(point, srs){
    if(srs === this.srs) return point;
    if(this.fromSRS === undefined){
      this.fromSRS = getTransform(
        srs, this.srs
      );
    }
    return this.fromSRS(point);
  }

  btransform(point, srs){
    if(srs === this.srs) return point;
    if(this.toSRS === undefined){
      this.toSRS = getTransform(
        this.srs, srs
      );
    }
    return this.toSRS(point);
  }

  componentDidMount(){
    const resolutions = [
      4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
      1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5
    ];
    const extent = [2420000, 1030000, 2900000, 1350000];
    const center = [
      (extent[2]-extent[0])/2 + extent[0],
      (extent[3]-extent[1])/2 + extent[1]
    ];
    const projection = getProjection(this.srs);
    projection.setExtent(extent);
    const matrixIds = [];
    for (var i = 0; i < resolutions.length; i++) {
      matrixIds.push(i);
    }
    var tileGrid = new WMTSTileGrid({
      origin: [extent[0], extent[3]],
      // origin: [420000, 350000],
      resolutions: resolutions,
      matrixIds: matrixIds
    });
    this.map = new Map({
      layers: [
        new LayerGroup({
          visible: true,
          layers: [
            new TileLayer({
              minResolution: 2.5,
              preload: Infinity,
              source: new WMTS({
                crossOrigin: 'anonymous',
                attributions: '&copy; Data: <a href="http://www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>',
                url: 'https://wmts10.geo.admin.ch/1.0.0/{Layer}/default/current/2056/{TileMatrix}/{TileCol}/{TileRow}.jpeg',
                tileGrid: tileGrid,
                projection: getProjection(this.srs),
                layer: "ch.swisstopo.pixelkarte-farbe",
                requestEncoding: 'REST'
              })
            }),
            new TileLayer({
              maxResolution: 2.5,
              preload: Infinity,
              source: new WMTS({
                crossOrigin: 'anonymous',
                attributions: '&copy; Data: <a href="http://www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>',
                url: 'https://wmts10.geo.admin.ch/1.0.0/{Layer}/default/current/2056/{TileMatrix}/{TileCol}/{TileRow}.png',
                tileGrid: tileGrid,
                projection: getProjection(this.srs),
                layer: "ch.swisstopo.swisstlm3d-karte-farbe",
                requestEncoding: 'REST'
              })
            })
          ]
        })
      ],
      target: 'point',
      view: new View({
        /*maxResolution: 340,
        minResolution: 1,*/
        resolution: this.state.point !== null? 1: 500,
        center: this.state.point !== null?
          this.state.point: center,
        // center: [2720000, 1095000],
        projection: projection,
        extent: extent
        //extent: [708000, 115000, 727000, 143000]
      })
    });

    this.position = new VectorSource();
    this.map.addLayer(
      new VectorLayer({
        source: this.position,
        style: this.styleFunction
      })
    );

    // ol Drawing point interaction declaration
    this.draw = new Draw({
      type: 'Point',
      source: this.position
    });
    this.map.addInteraction(this.draw);

    // ol Modify point interaction declaration
    this.modify = new Modify({
      source: this.position
    });
    this.map.addInteraction(this.modify);

    if(this.state.point !== null){
      this.centerFeature = new Feature({
          name: "Center",
          geometry: new Point(this.state.point)
      });
      this.position.addFeature(
          this.centerFeature
      );
      this.draw.setActive(false);
    }else{
      this.draw.setActive(true);
    }

    this.position.on('addfeature', this.changefeature, this);
    this.position.on('changefeature', this.changefeature, this);

  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    if(
      _.isNumber(nextProps.x)
      && _.isNumber(nextProps.y)
      && nextProps.x + nextProps.y !== 0
      && !_.isNil(nextProps.srs)
    ){
      console.log('Updating map point', nextProps);
      const point = this.transform(
        [nextProps.x, nextProps.y], nextProps.srs
      );
      if(
        !_.isEqual(point, this.state.point)
      ){
        console.log(point, this.state.point);
        this.setState({
          point: point,
          toPoint: [nextProps.x, nextProps.y]
        });
        this.draw.setActive(false);
        this.position.un('changefeature', this.changefeature, this);
        this.position.un('addfeature', this.changefeature, this);
        if(this.centerFeature){
          this.centerFeature.getGeometry().setCoordinates(point);
        }else{
          this.centerFeature = new Feature({
            name: "Center",
            geometry: new Point(point)
          });
          this.position.addFeature(
            this.centerFeature
          );
        }
        this.map.getView().fit(
          this.centerFeature.getGeometry(),
          {
            //padding: [170, 100, 30, 100],
            minResolution: 1
          }
        );
        this.position.on('changefeature', this.changefeature, this);
        this.position.on('addfeature', this.changefeature, this);
      }
    }
  }

  /*
      Function fired as soon the editing vector source
      is changed.
  */
  changefeature(ev){
    const { changefeature } = this.props;
    let feature = ev.feature;
    let coordinates = feature.getGeometry().getCoordinates();
    if (this.centerFeature === undefined){
      this.centerFeature = feature;
    }
    this.setState({
      point: coordinates,
      toPoint: !_.isNil(this.props.srs)?
        this.btransform(
          this.state.point,
          this.props.srs 
        ): coordinates
    }, ()=>{
      // Callback after state is updated
      if (_.isFunction(changefeature)){
        changefeature(this.state.toPoint);
      }
    });
    // if(ev.type='addfeature'){
    //     this.disableEditing();
    // }
    this.draw.setActive(false);
  }

  styleFunction(feature, resolution){
    const {
      highlighted
    } = this.props;

    let selected = highlighted !== undefined
      && highlighted.indexOf(feature.get('id'))>-1;

    let conf = {
      image: new Circle({
        radius: selected? 10: 6,
        fill: selected?
          new Fill({color: 'rgba(255, 0, 0, 0.8)'}):
          new Fill({color: 'rgba(0, 255, 0, 1)'}),
        stroke: new Stroke({color: 'black', width: 1})
      })
    };

    // if(resolution<10){
    //   conf.text = new Text({
    //     textAlign: "center",
    //     textBaseline: 'middle',
    //     fill: new Fill({color: 'black'}),
    //     font: '12px sans-serif',
    //     text: feature.get('name'),
    //     offsetY: 12
    //   });
    // }

    return [new Style(conf)];
  }

  render() {
    console.log('render');
    return (
      <Segment
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px',
          flex: '1 1 100%',
          // border: 'thin solid #cccccc'
      }}>
        <div
          id='point'
          style={{
            // width: '100%',
            // height: '100%',
            padding: '0px',
            flex: '1 1 100%',
            // border: 'thin solid #cccccc'
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0.5em',
            color: 'white',
            backgroundColor: '#3e3e3e'
          }}
        >
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            Coordinates: {
              _.isArray(this.state.toPoint)?
                _.round(this.state.toPoint[0], 2).toLocaleString()
                + ", " + _.round(this.state.toPoint[1], 2).toLocaleString():
                'n/p'
            } ({
              _.isNil(this.props.srs)?
                this.srs: this.props.srs
            })
          </div>
          <div>
            <Button
              disabled={
                !_.isArray(this.state.toPoint)
              }
              primary
              size='mini'
              onClick={(e)=>{
                if(_.isFunction(this.props.applyChange)){
                  this.props.applyChange(
                    _.round(this.state.toPoint[0], 2),
                      _.round(this.state.toPoint[1], 2)
                  )
                }
              }}>Apply</Button>
          </div>
        </div>
      </Segment>
    );
  }
};

PointComponent.propTypes = {
  changefeature: PropTypes.func,
  applyChange: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
  srs: PropTypes.string
  // highlighted: PropTypes.array,
  // hover: PropTypes.func,
  // selected: PropTypes.func
};

PointComponent.defaultProps = {
  x: null,
  y: null,
  srs: null
};

export default PointComponent;
