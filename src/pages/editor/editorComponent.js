import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import {
  Modal
} from 'semantic-ui-react';

import {
  loadEditingBoreholes
} from '@ist-supsi/bmsjs';

import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import BoreholeForm from '../../commons/form/borehole/boreholeForm';
import BoreholeEditorTable from '../../commons/table/boreholeEditorTable';
import MenuEditorSearch from '../../commons/menu/editor/menuEditorSearch';
import MenuEditorForm from '../../commons/menu/editor/menuEditorForm';
import MenuContainer from '../../commons/menu/menuContainer';
import WorkflowForm from '../../commons/form/workflow/workflowForm';
import MultipleForm from '../../commons/form/multiple/multipleForm';


const EditorComponent = function (props) {

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <MenuContainer />
      <div
        style={{
          flex: '1 1 100%',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            // borderRight: 'thin solid #dfe0e0',
            boxShadow: 'rgba(0, 0, 0, 0.17) 2px 6px 6px 0px',
            display: 'flex',
            flexDirection: 'column',
            width: '250px'
          }}
        >
          <Switch>
            <Route
              component={MenuEditorSearch}
              exact
              path={process.env.PUBLIC_URL + "/editor"}
            />
            <Route
              component={MenuEditorForm}
              // onTimeout={()=>{

              // }}
              path={process.env.PUBLIC_URL + "/editor/:id"}
            />
          </Switch>
        </div>

        <div
          style={{
            flex: '1 1 0%',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Switch>
            <Route
              exact
              path={process.env.PUBLIC_URL + "/editor"}
              render={() => (
                <div
                  style={{
                    flex: '1 1.5 100%',
                    // padding: "1em",
                    // boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 8px 0px inset',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Modal
                    onUnmount={()=>{
                      // props.multipleSelected(null);
                      props.loadEditingBoreholes(
                        props.editor.page,
                        props.search.filter,
                        props.editor.direction
                      );
                    }}
                    // open={props.store.mselected}
                    open={Array.isArray(props.store.mselected)}
                  >
                    <Modal.Content
                      style={{
                        // maxHeight: '600px',
                        // overflowY: 'auto'
                      }}
                    >
                      <MultipleForm 
                        selected={props.store.mselected}
                      />
                    </Modal.Content>
                  </Modal>
                  <BoreholeEditorTable
                    activeItem={
                      !_.isNil(props.store.bselected) ?
                        props.store.bselected.id : null
                    }
                    filter={{
                      ...props.search.filter
                    }}
                    onDelete={(selection) => {
                      props.delete(
                        selection, props.search.filter
                      );
                    }}
                    onMultiple={(selection) => {
                      props.multipleSelected(
                        selection, props.search.filter
                      );
                    }}
                    onSelected={(borehole) => {
                      // Lock borehole
                      if (borehole !== null) {
                        props.lock(borehole.id);
                      }
                    }}
                  />
                </div>
              )}
            />
            <Route
              exact={false}
              path={process.env.PUBLIC_URL + "/editor/:id"}
              render={() => (
                <div
                  style={{
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flex: '1 1 100%',
                    flexDirection: 'column',
                    padding: '1em'
                  }}
                >
                  <BoreholeForm />
                </div>
              )}
            />
          </Switch>
        </div>

        <Switch>
          <Route 
            component={({ match }) => (
              <div
                style={{
                  width: '400px',
                  boxShadow: 'rgba(0, 0, 0, 0.17) -2px 6px 6px 0px',
                  padding: '1em'
                }}
              >
                <WorkflowForm
                  id={
                    parseInt(match.params.id, 10)
                  }
                />
              </div>
            )}
            path={process.env.PUBLIC_URL + "/editor/:id"}
          />
        </Switch>
      </div>
    </div>
  );
  // }

};

EditorComponent.propTypes = {
  delete: PropTypes.func,
  editor: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loadEditingBoreholes: PropTypes.func,
  lock: PropTypes.func,
  multipleSelected: PropTypes.func,
  search: PropTypes.object,
  store: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    pcnt: state.core_project_list.dlen,
    editor: state.core_borehole_editor_list,
    bcnt: state.core_borehole_list.dlen,
    scnt: state.core_stratigraphy_list.dlen,
    store: state.editor,
    search: state.searchEditor,
    user: state.core_user
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    dispatch: dispatch,
    projectSelected: (project) => {
      dispatch({
        type: 'EDITOR_PROJECT_SELECTED',
        selected: project
      });
    },
    boreholeSelected: (borehole) => {
      dispatch({
        type: 'EDITOR_BOREHOLE_SELECTED',
        selected: borehole
      });
    },
    lock: (id) => {
      dispatch({
        type: 'CLEAR',
        path: '/borehole'
      });
      ownprops.history.push(
        process.env.PUBLIC_URL + "/editor/" + id
      );
    },
    multipleSelected: (selection, filter = null) => {
      dispatch({
        type: 'EDITOR_MULTIPLE_SELECTED',
        selection: selection,
        filter: filter
      });
    },
    delete: (selection, filter = null) => {
      dispatch({
        type: 'EDITOR_MULTIPLE_DELETION',
        selection: selection,
        filter: filter
      });
    },
    loadEditingBoreholes: (page, filter = {}, direction = null) => {
      dispatch(
        loadEditingBoreholes(
          page, 100, filter, 'creation', direction
        )
      );
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation('editor')(EditorComponent))
);
