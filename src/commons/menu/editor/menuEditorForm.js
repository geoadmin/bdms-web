import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  withRouter
} from "react-router-dom";

import {
  Button,
  Header,
  Icon,
  List,
  Menu,
  Modal,
  Progress
} from 'semantic-ui-react';

// import DomainText from '../../form/domain/domainText';
import DateText from '../../form/dateText';
import TranslationText from '../../form/translationText';
import moment from 'moment';

import {
  deleteBorehole,
  loadBorehole,
  lockBorehole,
  unlockBorehole,
} from '@ist-supsi/bmsjs';

import Scroller from '../../scroller';

const timeout = 10;

class MenuEditorForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      delete: false,
      deleting: false,
      timeout: 0
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(){
    this.setState({ confirmDelete: true });
  }

  handleClose(){
    this.setState({ confirmDelete: false });
  }

  render() {
    const {
      borehole,
      history,
      location,
      match,
      reload,
      t,
      user
    } = this.props;
    if (borehole.isFetching === true) {
      return null;
    }

    let editableByCurrentUser = true;
    const wg = borehole.data.id !== null
    && user.data.workgroups.find(
      workgroup => (
        workgroup.id === borehole.data.workgroup.id
      )
    );
    if (wg !== undefined && wg.hasOwnProperty('roles')) {
      editableByCurrentUser = (
        wg.roles.indexOf(borehole.data.role) === -1
      );
    }

    return (
      [
        <Scroller
          key='sb-em-2'
          style={{
            flex: '1 1 100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <List
            divided
            relaxed
            selection
          >
            <List.Item
              onClick={() => {
                this.setState({
                  delete: false
                }, () => {
                  history.push(
                    process.env.PUBLIC_URL + "/editor"
                  );
                });
              }}
              style={{
                padding: '1em'
              }}
            >
              <List.Icon
                name='arrow left'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  <TranslationText
                    id="done"
                  />
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item
              active={
                location.pathname ===
                process.env.PUBLIC_URL + "/editor/"
                + match.params.id
              }
              onClick={() => {
                history.push(
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname ===
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id ?
                  '0.25em solid rgb(237, 29, 36)' : null
              }}
            >
              <List.Icon
                name='map marker'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  <TranslationText
                    firstUpperCase
                    id="location"
                  />
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item
              active={
                location.pathname ===
                process.env.PUBLIC_URL + "/editor/"
                + match.params.id + "/borehole"
              }
              onClick={() => {
                history.push(
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/borehole"
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname ===
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/borehole" ?
                  '0.25em solid rgb(237, 29, 36)' : null
              }}
            >
              <List.Icon
                name='info'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  <TranslationText
                    firstUpperCase
                    id="borehole"
                  />
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item
              active={
                location.pathname ===
                process.env.PUBLIC_URL + "/editor/"
                + match.params.id + "/stratigraphy"
              }
              onClick={() => {
                history.push(
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/stratigraphy"
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname ===
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/stratigraphy" ?
                  '0.25em solid rgb(237, 29, 36)' : null
              }}
            >
              <List.Icon
                name='align justify'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  <TranslationText
                    firstUpperCase
                    id="stratigraphy"
                  />
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item
              active={
                location.pathname ===
                process.env.PUBLIC_URL + "/editor/"
                + match.params.id + "/attachments"
              }
              onClick={() => {
                history.push(
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/attachments"
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname ===
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/attachments" ?
                  '0.25em solid rgb(237, 29, 36)' : null
              }}
            >
              <List.Icon
                name='attach'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  <TranslationText
                    firstUpperCase
                    id="attachments"
                  />
                </List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Scroller>,
        <div
          key='medf-prps'
          style={{
            padding: '2em'
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.7em',
                color: '#787878'
              }}
            >
              <TranslationText
                id="locked_status"
              />
            </div>
            <div
              style={{
                fontWeight: 'bold'
              }}
            >
              <span
                style={{
                  color: 'red'
                }}
              >
                {
                  (
                    borehole.data.lock !== null ||
                    borehole.data.role === null
                  )?
                    <TranslationText
                      id="editingEnabled"
                    />:
                    <TranslationText
                      id={`status${borehole.data.role.toLowerCase()}`}
                    />
                }
              </span>
            </div>
          </div>

          {
            borehole.data.imported === true?
              <div
                style={{
                  fontSize: '0.7em',
                  color: 'rgb(33, 133, 208)'
                }}
              >
                <TranslationText
                  id="importedData"
                />
              </div>: null
          }
          
          <div
            style={{
              fontSize: '0.7em',
              color: '#787878'
            }}
          >
            {
              borehole.data.workgroup && borehole.data.workgroup.supplier === true?
                <TranslationText
                  id="supplier"
                />:
                <TranslationText
                  id="workgroup"
                />
            }
          </div>
          <div
            style={{
              fontWeight: 'bold'
            }}
          >
            {borehole.data.workgroup && borehole.data.workgroup.name}
          </div>

          <div>
            <div
              style={{
                fontSize: '0.7em',
                color: '#787878'
              }}
            >
              {
                borehole.data.imported === true?
                  <TranslationText
                    id="importedBy"
                  />:
                  <TranslationText
                    id="createdBy"
                  />
              }:
            </div>
            <div
              style={{
                fontWeight: 'bold'
              }}
            >
              {
                borehole.data.author !== undefined?
                  borehole.data.author.username === this.props.user.data.username?
                    borehole.data.author.fullname + ' (' + t('common:you') + ')':
                    borehole.data.author.fullname: '-'
              }
            </div>
          </div>

          <div
            style={{
              fontSize: '0.7em',
              color: '#787878'
            }}
          >
            {
              borehole.data.imported === true?
                <TranslationText
                  id="importDate"
                />:
                <TranslationText
                  id="createDate"
                />
            }:
          </div>
          <div
            style={{
              fontWeight: 'bold'
            }}
          >
            {
              borehole.data.author &&
              <DateText
                date={borehole.data.author.date}
                hours
              />
            }
          </div>

          <div
            style={{
              fontSize: '0.8em',
              marginBottom: '0.25em'
            }}
          >
            {
              borehole.data.author !== undefined?
                <DateText
                  date={borehole.data.author.date}
                  fromnow
                />: '-'
            }
          </div>
          
          <div>
            <div
              style={{
                fontSize: '0.7em',
                color: '#787878'
              }}
            >
              {
                borehole.data.lock !== null?
                  <TranslationText
                    id="locked_by"
                  />:
                  <TranslationText
                    id="updatedBy"
                  />
              }:
            </div>
            <div
              style={{
                fontWeight: 'bold'
              }}
            >
              {
                borehole.data.lock !== null?
                  borehole.data.lock.username === this.props.user.data.username?
                    borehole.data.updater.fullname + ' (' + t('common:you') + ')':
                    borehole.data.lock.fullname:
                  borehole.data.updater.username === this.props.user.data.username?
                    borehole.data.updater.fullname + ' (' + t('common:you') + ')':
                    borehole.data.updater.fullname
              }
            </div>
            <div
              style={{
                fontSize: '0.7em',
                color: '#787878'
              }}
            >
              {
                borehole.data.lock !== null?
                  <TranslationText
                    id="locked_at"
                  />:
                  <TranslationText
                    id="updateDate"
                  />
              }:
            </div>
            <div
              style={{
                fontWeight: 'bold'
              }}
            >
              {
                borehole.data.lock !== null?
                  <DateText
                    date={borehole.data.lock.date}
                    hours
                  />:
                  <DateText
                    date={borehole.data.updater.date}
                    hours
                  />
              }
            </div>
            <div
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em'
              }}
            >
              {
                borehole.data.lock !== null?
                  <span
                    style={{
                      color: this.state.timeout >= 90? 'red': null
                    }}
                  >
                    <DateText
                      date={borehole.data.lock.date}
                      fromnow
                      onTick={(d, m)=>{
                        this.setState({
                          timeout: (
                            moment().diff(m, 'seconds') / (timeout * 60) * 100
                          )
                        }, ()=>{
                          if (
                            this.state.timeout > 100
                          ) {
                            this.props.unlock(
                              borehole.data.id
                            );
                          }
                        });
                      }}
                      timer={1}
                    />
                  </span>:
                  <DateText
                    date={borehole.data.updater.date}
                    fromnow
                  />
              }
            </div>
            {
              borehole.data.lock !== null
              && editableByCurrentUser === false?
                <Progress
                  color={
                    this.state.timeout >= 90?
                      'red': this.state.timeout >= 80?
                        'orange': 'black'
                  }
                  percent={this.state.timeout}
                  size='tiny'
                  style={{
                    margin: '0.5em 0em 0.2em'
                  }}
                />: null
            }
            {
              borehole.data.lock !== null
              && editableByCurrentUser === false?
                <div
                  style={{
                    // textAlign: 'right'
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '0.8em'
                  }}
                >
                  <div style={{ flex: '1 1 100%' }}>
                    {(()=>{
                      let d = moment.duration(
                        moment(
                          borehole.data.lock.date
                        ).add(10, 'minutes').diff(moment())
                      );
                      return (
                        d.minutes().toString().padStart(2, '0') + ':'
                        + d.seconds().toString().padStart(2, '0')
                      );
                    })()}
                  </div>
                  <div>
                    <span
                      className='linker'
                      onClick={()=>{
                        this.props.lock(
                          borehole.data.id
                        );
                      }}
                    >
                      <TranslationText
                        id='refresh'
                      />
                    </span>
                  </div>
                </div>: null
            }
          </div>
        </div>,
        <Menu
          icon='labeled'
          key='sb-em-3'
          size='mini'
          style={{
            margin: '0py',
            minHeight: '70px'
          }}
        >
          {
            editableByCurrentUser === true?
              null:
              <Modal
                closeIcon
                onClose={this.handleClose}
                open={this.state.confirmDelete}
                size='mini'
                trigger={
                  <Menu.Item
                    disabled={
                      borehole.data.lock === null
                      || borehole.data.lock.username !== user.data.username
                    }
                    onClick={() => {
                      this.setState({
                        confirmDelete: true
                      });
                      // deleteBorehole(borehole.data.id).then(
                      //   function () {
                      //     history.push(
                      //       process.env.PUBLIC_URL + "/editor"
                      //     );
                      //   }
                      // );
                    }}
                    style={{
                      flex: 1
                    }}
                  >
                    <Icon
                      name='trash alternate'
                    />
                    <TranslationText
                      id='delete'
                    />
                  </Menu.Item>
                }
              >
                <Header
                  content={
                    <TranslationText
                      id='deleteForever'
                    />  
                  }
                  // icon='archive'
                />
                <Modal.Content>
                  <p>
                    <TranslationText
                      id='sure'
                    />
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    negative
                    loading={this.state.deleting}
                    onClick={() => {
                      this.setState({
                        deleting: true
                      }, () => {
                        deleteBorehole(borehole.data.id).then(
                          function () {
                            history.push(
                              process.env.PUBLIC_URL + "/editor"
                            );
                          }
                        );
                      });
                    }}
                  >
                    <Icon
                      name='trash alternate'
                    /> 
                    &nbsp;
                    <TranslationText
                      id='delete'
                    />
                  </Button>
                </Modal.Actions>
              </Modal>
          }
          {
            editableByCurrentUser === true?
              null:
              <Menu.Item
                disabled={
                  borehole.data.lock !== null
                  && borehole.data.lock.username !== user.data.username
                }
                onClick={() => {
                  if (
                    borehole.data.lock !== null
                    && borehole.data.lock.username === user.data.username
                  ){
                    this.props.unlock(
                      borehole.data.id
                    );
                  } else if (
                    borehole.data.lock === null
                  ) {
                    this.props.lock(
                      borehole.data.id
                    );
                  }
                }}
                style={{
                  flex: 1
                }}
              >
                <Icon
                  name={
                    borehole.data.lock !== null
                    && moment().diff(
                      moment(borehole.data.lock.date),
                      'seconds'
                    ) < (timeout * 60)?
                      'stop': 'play'
                  }
                />
                {
                  borehole.data.lock !== null
                  && moment().diff(
                    moment(borehole.data.lock.date),
                    'seconds'
                  ) < (timeout * 60)?
                    <TranslationText
                      id='editingStop'
                    />:
                    <TranslationText
                      id='editingStart'
                    />
                }
              </Menu.Item>
          }
          {
            editableByCurrentUser === true?
              <Menu.Item
                disabled={borehole.isFetching === true}
                onClick={() => {
                  reload(borehole.data.id);
                }}
                style={{
                  flex: 1
                }}
              >
                <Icon
                  loading={borehole.isFetching === true}
                  name='refresh'
                />
                {t('common:refresh')}
              </Menu.Item>: null
          }
        </Menu>
      ]
    );
  }
}

MenuEditorForm.propTypes = {
  borehole: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  lock: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  reload: PropTypes.func,
  t: PropTypes.func,
  unlock: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    borehole: state.core_borehole,
    editor: state.editor,
    user: state.core_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    boreholeSelected: (borehole) => {
      dispatch({
        path: '/borehole',
        type: 'CLEAR'
      });
      dispatch({
        type: 'EDITOR_BOREHOLE_SELECTED',
        selected: borehole
      });
    },
    lock: (id) => {
      dispatch(
        lockBorehole(id)
      );
    },
    // refresh: () => {
    //   dispatch({
    //     type: 'FSEARCH_EDITOR_FILTER_REFRESH'
    //   });
    // },
    reset: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET'
      });
    },
    unlock: (id) => {
      return dispatch(unlockBorehole(id));
    },
    reload: (id) => {
      dispatch(loadBorehole(id));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation(['common'])(MenuEditorForm))
);
