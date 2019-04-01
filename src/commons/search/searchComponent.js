import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import {
  Form,
  Input,
  Checkbox
} from 'semantic-ui-react';

import LabelReset from '../form/labelReset';
import DomainDropdown from '../form/domain/dropdown/domainDropdown';
import MunicipalityDropdown from '../form/municipality/dropdown/municipalityDropdown';
import CantonDropdown from '../form/cantons/dropdown/cantonDropdown';
import DateField from '../form/dateField';

class SearchComponent extends React.Component {
  componentDidUpdate(prevProps){
    const {
      search,
      onChange
    } = this.props;
    this.isVisible = this.isVisible.bind(this);
    if(
        onChange !== undefined
        && !_.isEqual(
          search.filter, prevProps.search.filter
        )
    ){
      onChange({...search.filter});
    }
  }
  isVisible(filter){
    const {search, setting} = this.props;
    if(search.advanced === true) return true;
    if(_.get(setting, filter)===true){
      return true;
    }
    return false;
  }
  render() {
    const {search, setting, t} = this.props;
    return (
      <Form size='tiny'>
        <Form.Field
          style={{
            display: (
              search.advanced === true
              || setting.mapfilter === true
            )? null: 'none'
          }}
        >
          <label>Filter by Map</label>
          <Checkbox
            toggle
            checked={search.mapfilter}
            onChange={(e, d)=>{
              this.props.setmapfilter(d.checked)
            }}/>
        </Form.Field>
        <Form.Group
          widths='equal'
          style={{
            display: (
              search.advanced === true
              || setting.zoom2selected === true
            )? null: 'none'
          }}
        >
          <Form.Field>
            <label>Center to selected</label>
            <Checkbox
              toggle
              checked={search.center2selected}
              onChange={(e, d)=>{
                this.props.setcenter2filter(d.checked)
              }}/>
          </Form.Field>
          <Form.Field
            style={{
              textAlign: 'right',
              display: search.center2selected === true? null: 'none'
            }}
          >
            <label>...and zoom</label>
            <Checkbox
              toggle
              checked={search.zoom2selected}
              onChange={(e, d)=>{
                this.props.setzoom2filter(d.checked)
              }}/>
          </Form.Field>
        </Form.Group>
        {
          this.isVisible('extended.original_name')?
            <Form.Field>
              <label>{t('borehole_form:original_name')}</label>
              <Input
                placeholder={t('borehole_form:original_name')}
                value={search.filter.identifier}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'identifier',
                    eve.target.value
                  )
                }}/>
              <LabelReset onClick={()=>{
                  this.props.setFilter(
                    'identifier', ''
                  )
              }}/>
            </Form.Field>: null
        }
        {
          this.isVisible('custom.public_name')?
            <Form.Field>
              <label>{t('borehole_form:public_name')}</label>
              <Input
                placeholder={t('borehole_form:public_name')}
                value={search.filter.public_name}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'public_name',
                    eve.target.value
                  )
                }}/>
              <LabelReset onClick={()=>{
                  this.props.setFilter(
                    'public_name', ''
                  )
              }}/>
            </Form.Field>: null
        }
        {
          this.isVisible('kind')?
            <Form.Field>
              <label>{t('borehole_form:kind')}</label>
              <DomainDropdown
                schema='kind'
                selected={search.filter.kind}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'kind', selected.id
                  );
                }}
                reset={false}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'kind', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('extended.method')?
            <Form.Field>
              <label>{t('borehole_form:method')}</label>
              <DomainDropdown
                schema='extended.method'
                selected={search.filter.method}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'method', selected.id
                  );
                }}
                reset={false}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'method', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.project_name')?
            <Form.Field>
              <label>{t('borehole_form:project_name')}</label>
              <Input
                placeholder={t('borehole_form:project_name')}
                value={search.filter.project_name}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'project_name',
                    eve.target.value
                  )
                }}/>
              <LabelReset onClick={()=>{
                  this.props.setFilter(
                    'project_name', ''
                  )
              }}/>
            </Form.Field>: null
        }
        {
          this.isVisible('restriction')?
            <Form.Field>
              <label>{t('borehole_form:restriction')}</label>
              <DomainDropdown
                schema='restriction'
                selected={search.filter.restriction}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'restriction', selected.id
                  );
                }}
                reset={false}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'restriction', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.landuse')?
            <Form.Field>
              <label>{t('borehole_form:landuse')}</label>
              <DomainDropdown
                schema='custom.landuse'
                selected={search.filter.landuse}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'landuse', selected.id
                  );
                }}
                reset={false}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'landuse', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('restriction')?
            <Form.Field>
              <label>{t('borehole_form:restriction_until')} (
                {t('borehole_form:date_format')})</label>
              <DateField
                date={search.filter.restriction_until_from}
                onChange={(selected)=>{
                  this.props.setFilter(
                    'restriction_until_from', selected
                  );
                }}
                placeholder='After this date'
              />
              <DateField
                date={search.filter.restriction_until_to}
                onChange={(selected)=>{
                  this.props.setFilter(
                    'restriction_until_to', selected
                  );
                }}
                placeholder='Before this date'
              />
              <LabelReset
                onClick={()=>{
                  this.props.resetRestriction();
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('elevation_z')?
            <Form.Field>
              <label>{t('borehole_form:elevation_z')}</label>
              <Input
                placeholder='Elevation from meters'
                value={search.filter.elevation_z_from}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'elevation_z_from',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <Input
                placeholder='Elevation to meters'
                value={search.filter.elevation_z_to}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'elevation_z_to',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <LabelReset
                onClick={()=>{
                  this.props.resetElevation();
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('length')?
            <Form.Field>
              <label>{t('borehole_form:length')}</label>
              <Input
                placeholder='Depth from meters'
                value={search.filter.length_from}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'length_from',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <Input
                placeholder='Depth to meters'
                value={search.filter.length_to}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'length_to',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <LabelReset
                onClick={()=>{
                  this.props.resetDepth();
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('extended.groundwater')?
          <Form.Field>
            <label>{t('borehole_form:groundwater')}</label>
            <Form.Group inline>
              <Form.Radio
                label={t('common:yes')}
                checked={search.filter.groundwater === true}
                onChange={(e, d)=>{
                  this.props.setFilter('groundwater', true);
                }}
              />
              <Form.Radio
                label={t('common:no')}
                checked={search.filter.groundwater === false}
                onChange={(e, d)=>{
                  this.props.setFilter('groundwater', false);
                }}
              />
            </Form.Group>
            <Form.Radio
              label={t('common:np')}
              checked={search.filter.groundwater === null}
              onChange={(e, d)=>{
                this.props.setFilter('groundwater', null);
              }}
            />
            <LabelReset
              onClick={()=>{
                this.props.setFilter('groundwater', -1);
              }}
            />
          </Form.Field>: null
        }
        {
          this.isVisible('extended.top_bedrock')?
            <Form.Field>
              <label>{t('borehole_form:top_bedrock')}</label>
              <Input
                placeholder='From meters'
                value={search.filter.top_bedrock_from}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'top_bedrock_from',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <Input
                placeholder='To meters'
                value={search.filter.top_bedrock_to}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'top_bedrock_to',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <LabelReset
                onClick={()=>{
                  this.props.resetTotBedrock();
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('status')?
            <Form.Field>
              <label>{t('borehole_form:status')}</label>
              <DomainDropdown
                schema='extended.status'
                selected={search.filter.status}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'status', selected.id
                  );
                }}
                reset={false}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'status', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('extended.purpose')?
            <Form.Field>
              <label>{t('borehole_form:purpose')}</label>
              <DomainDropdown
                schema='extended.purpose'
                selected={search.filter.purpose}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'purpose', selected.id
                  );
                }}
                reset={false}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'purpose', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.cuttings')?
            <Form.Field>
              <label>{t('borehole_form:cuttings')}</label>
              <DomainDropdown
                schema='custom.cuttings'
                selected={search.filter.cuttings}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'cuttings', selected.id
                  );
                }}
                reset={false}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'cuttings', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('drilling_date')?
            <Form.Field>
              <label>{t('borehole_form:drilling_date')} (
                {t('borehole_form:date_format')})</label>
              <DateField
                date={search.filter.drilling_date_from}
                onChange={(selected)=>{
                  this.props.setFilter(
                    'drilling_date_from', selected
                  );
                }}
                placeholder='After this date'
              />
              <DateField
                date={search.filter.drilling_date_to}
                onChange={(selected)=>{
                  this.props.setFilter(
                    'drilling_date_to', selected
                  );
                }}
                placeholder='Before this date'
              />
              <LabelReset
                onClick={()=>{
                  this.props.resetDrilling();
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.drill_diameter')?
            <Form.Field>
              <label>{t('borehole_form:drill_diameter')}</label>
              <Input
                placeholder='From meters'
                value={search.filter.drill_diameter_from}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'drill_diameter_from',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <Input
                placeholder='To meters'
                value={search.filter.drill_diameter_to}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'drill_diameter_to',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <LabelReset
                onClick={()=>{
                  this.props.resetDrillDiameter();
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('bore_inc')?
            <Form.Field>
              <label>{t('borehole_form:bore_inc')}</label>
              <Input
                placeholder={t('common:from') + " " + t('common:degree')}
                value={search.filter.bore_inc_from}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'bore_inc_from',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <Input
                placeholder={t('common:to') + " " + t('common:degree')}
                value={search.filter.bore_inc_to}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'bore_inc_to',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <LabelReset
                onClick={()=>{
                  this.props.resetBoreInc();
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('bore_inc')?
            <Form.Field>
              <label>{t('borehole_form:bore_inc_dir')}</label>
              <Input
                placeholder={t('common:from') + " " + t('common:degree')}
                value={search.filter.bore_inc_dir_from}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'bore_inc_dir_from',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <Input
                placeholder={t('common:to') + " " + t('common:degree')}
                value={search.filter.bore_inc_dir_to}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'bore_inc_dir_to',
                    eve.target.value
                  )
                }}
                type='number'
              />
              <LabelReset
                onClick={()=>{
                  this.props.resetBoreIncDir();
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.lit_pet_top_bedrock')?
            <Form.Field>
              <label>{t('borehole_form:lit_pet_top_bedrock')}</label>
              <DomainDropdown
                schema='custom.lit_pet_top_bedrock'
                selected={search.filter.lit_pet_top_bedrock}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'lit_pet_top_bedrock', selected.id
                  );
                }}
                reset={false}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'lit_pet_top_bedrock', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.lit_str_top_bedrock')?
            <Form.Field>
              <label>{t('borehole_form:lit_str_top_bedrock')}</label>
              <DomainDropdown
                schema='custom.lit_str_top_bedrock'
                selected={search.filter.lit_str_top_bedrock}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'lit_str_top_bedrock', selected.id
                  );
                }}
                reset={false}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'lit_str_top_bedrock', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.chro_str_top_bedrock')?
            <Form.Field>
              <label>{t('borehole_form:chro_str_top_bedrock')}</label>
              <DomainDropdown
                schema='custom.chro_str_top_bedrock'
                selected={search.filter.chro_str_top_bedrock}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'chro_str_top_bedrock', selected.id
                  );
                }}
                reset={false}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'chro_str_top_bedrock', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.canton')?
            <Form.Field>
              <label>{t('borehole_form:canton')}</label>
              <CantonDropdown
                selected={search.filter.canton}
                onSelected={(selected)=>{
                  if(search.filter.municipality !== null){
                    this.props.setFilter(
                      'municipality', null
                    );
                  }
                  this.props.setFilter(
                    'canton', selected.id
                  );
                }}/>
                <LabelReset
                  onClick={()=>{
                    this.props.setFilter(
                      'canton', null
                    );
                  }}
                />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.canton')?
            <Form.Field>
              <label>Municipality</label>
              <MunicipalityDropdown
                selected={search.filter.municipality}
                disabled={search.filter.canton===null}
                canton={search.filter.canton}
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'municipality', selected.id
                  );
                }}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'municipality', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.canton')?
            <Form.Field>
              <label>{t('borehole_form:address')}</label>
              <Input
                placeholder={t('borehole_form:address')}
                value={search.filter.address}
                onChange={(eve)=>{
                  this.props.setFilter(
                    'address',
                    eve.target.value
                  )
                }}/>
              <LabelReset onClick={()=>{
                  this.props.setFilter(
                    'address', ''
                  )
              }}/>
            </Form.Field>: null
        }
      </Form>
    )
  }
}

SearchComponent.propTypes = {
  onChange: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.search,
    setting: state.setting.data.filter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    setmapfilter: (active) => {
      dispatch({
        type: 'SEARCH_MAPFILTER_CHANGED',
        active: active
      });
    },
    setzoom2filter: (active) => {
      dispatch({
        type: 'SEARCH_ZOOM2_CHANGED',
        active: active
      });
    },
    setcenter2filter: (active) => {
      dispatch({
        type: 'SEARCH_CENTER2_CHANGED',
        active: active
      });
    },
    setFilter: (key, value) => {
      dispatch({
        type: 'SEARCH_FILTER_CHANGED',
        key: key,
        value: value
      });
    },
    resetRestriction: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_RESTRICTION'
      });
    },
    resetElevation: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_ELEVATION'
      });
    },
    resetDepth: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_DEPTH'
      });
    },
    resetTotBedrock: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_TOP_BEDROCK'
      });
    },
    resetDrilling: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_DRILLING'
      });
    },
    resetDrillDiameter: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_DRILL_DIAMETER'
      });
    },
    resetBoreInc: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_BORE_INC'
      });
    },
    resetBoreIncDir: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_BORE_INC_DIR'
      });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate(['search', 'borehole_form', 'common'])(SearchComponent))
