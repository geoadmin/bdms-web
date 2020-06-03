import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import {
  Button,
  Form,
  Icon,
  Input,
  Radio,
  Table
} from 'semantic-ui-react';

import DomainText from '../form/domain/domainText';

class LayersList extends React.Component {

  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.getColor = this.getColor.bind(this);
    this.handleDeleteAction = this.handleDeleteAction.bind(this);
    this.handleResolvingAction = this.handleResolvingAction.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.getPattern = this.getPattern.bind(this);
    this.state = {
      resolving: null,
      resolvingAction: null,
      deleting: null,
      deleteAction: 0,
      value: null
    };
  }

  getPattern(id){
    const {
      domains,
      style
    } = this.props;
    let domain = (domains.data[
      // @todo Think something better!!
      style.patternNS
    ]).find(
      (element) => {
        return element.id === id;
      }
    );
    if (
      domain !== undefined &&
      domain.conf !== null &&
      domain.conf.hasOwnProperty('image')
    ){
      return 'url("' + process.env.PUBLIC_URL + '/img/lit/' + domain.conf.image + '")';
    }
    else {
      return null;
    }
  }

  getColor(id){
    const {
      domains,
      style
    } = this.props;
    let domain = (domains.data[style.colorNS]).find(
      (element) => {
        return element.id === id;
      }
    );
    if (
      domain !== undefined &&
      domain.conf !== null &&
      domain.conf.hasOwnProperty('color')
    ){
      const color = domain.conf.color;
      return 'rgb(' + color.join(',') + ')';
    }
    else {
      return null;
    }
  }

  handleDeleteAction (e, { value }) {
    this.setState({
      deleteAction: value,
      value: null
    }, () => {
      if (value === 3) {
        this.inputRef.current.focus();
      }
    });
  }

  handleResolvingAction (e, { value }) {
    this.setState({
      resolvingAction: value,
      value: null
    });
  }

  handleValue (e, { value }) {
    this.setState({ 'value': value });
  }

  render(){
    const {
      borehole,
      consistency,
      layers,
      style,
      t
    } = this.props;
    const length = layers.length;
    return (
      <Table
        basic
        selectable
        structured
      >
        <Table.Body>
          {
            layers.map((item, idx) => {

              const isBedrock = (
                item.depth_from === borehole.data.extended.top_bedrock
              );

              const ret = [];

              const resolving = this.state.resolving !== null
                && this.state.resolving.id === item.id;

              if (_.isFunction(this.props.onResolve)){

                if (
                  consistency.hasOwnProperty(item.id)
                ){
                  if (
                    consistency[item.id].missingLayers === true
                  ) {
                    ret.push(
                      <Table.Row
                        active={false}
                        disabled
                        key={'ll-info-'+idx}
                        negative
                        style={{
                          cursor: 'default'
                        }}
                      >
                        <Table.Cell
                          colSpan='3'
                          collapsing
                          style={{
                            width: '100%'
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 'bold',
                              whiteSpace: 'normal'
                            }}
                          >
                            <Icon name='warning sign' /> {
                              t('missingLayerSolution')
                            }
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  } else {
                    ret.push(
                      <Table.Row
                        active={false}
                        key={'ll-info-'+idx}
                        negative
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        <Table.Cell
                          colSpan={
                            resolving === true?
                              '3': _.isFunction(this.props.onDelete)?
                                '2': '1'
                          }
                          collapsing
                          style={{
                            width: '100%'
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 'bold',
                              whiteSpace: 'normal'
                            }}
                          >
                            <Icon name='warning sign' /> {
                              consistency[item.id].errorGap === true?
                                t('errorGap'):
                                consistency[item.id].errorStartWrong === true?
                                  t('errorStartWrong'):
                                  t('errorOverlap')
                            }
                          </div>
                          {
                            resolving === true?
                              <div>
                                <div
                                  style={{
                                    fontSize: '0.8em'
                                  }}
                                >
                                  {t('howToResolve')}
                                </div>
                                <div
                                  style={{
                                    marginTop: '0.5em'
                                  }}
                                >
                                  <Form>
                                    {
                                      consistency[item.id].errorGap === true
                                      || consistency[item.id].errorStartWrong === true?
                                        <Form.Field>
                                          <Radio
                                            checked={
                                              this.state.resolvingAction === 0
                                            }
                                            label={t('errorGapSolution1')}
                                            name='radioGroup'
                                            onChange={this.handleResolvingAction}
                                            value={0}
                                          />
                                        </Form.Field>: null
                                    }
                                    {
                                      idx > 0?
                                        <Form.Field>
                                          <Radio
                                            checked={
                                              this.state.resolvingAction === 1
                                            }
                                            label={t('errorGapSolution2')}
                                            name='radioGroup'
                                            onChange={this.handleResolvingAction}
                                            value={1}
                                          />
                                        </Form.Field>: null
                                    }
                                    {
                                      (idx + 1) <= length?
                                        <Form.Field>
                                          <Radio
                                            checked={this.state.resolvingAction === 2}
                                            label={
                                              consistency[item.id].errorStartWrong === true?
                                                t('errorGapSolution3'):
                                                t('errorGapSolution4')
                                            }
                                            name='radioGroup'
                                            onChange={this.handleResolvingAction}
                                            value={2}
                                          />
                                        </Form.Field>: null
                                    }
                                  </Form>
                                </div>
                                <div
                                  style={{
                                    marginTop: '0.5em',
                                    textAlign: 'right'
                                  }}
                                >
                                  <Button
                                    basic
                                    icon
                                    onClick={(e)=>{
                                      e.stopPropagation();
                                      this.setState({
                                        resolving: null,
                                        resolvingAction: null
                                      });
                                    }}
                                    size='mini'
                                  >
                                    <Icon name='cancel' /> Cancel
                                  </Button>
                                  <Button
                                    disabled={this.state.resolvingAction === null}
                                    icon
                                    onClick={(e)=>{
                                      e.stopPropagation();
                                      const resolvingAction = this.state.resolvingAction;
                                      this.setState({
                                        resolving: null,
                                        resolvingAction: null
                                      }, () => {
                                        this.props.onResolve(
                                          item, resolvingAction
                                        );
                                      });
                                    }}
                                    secondary
                                    size='mini'
                                  >
                                    <Icon name='check' /> Confirm
                                  </Button>
                                </div>
                              </div>: null
                          }
                        </Table.Cell>
                        {
                          this.state.resolving === null
                          || this.state.resolving.id !== item.id?
                            <Table.Cell
                              collapsing
                            >
                              <Button
                                basic
                                icon
                                onClick={(e)=>{
                                  e.stopPropagation();
                                  this.setState({
                                    resolving: item,
                                    resolvingAction: null,
                                    deleting: null,
                                    deleteAction: 0,
                                    value: null
                                  });
                                }}
                                size='mini'
                              >
                                <Icon name='wrench' />
                              </Button>
                            </Table.Cell>: null
                        }
                      </Table.Row>
                    );
                  }
                }
              }

              if (
                this.state.deleting !== null
                && this.state.deleting.id === item.id
              ){
                ret.push(
                  <Table.Row
                    active={false}
                    key={'ll-rw-'+idx}
                    negative
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    <Table.Cell
                      collapsing
                      colSpan={
                        _.isFunction(this.props.onDelete)? '3': '2'
                      }
                    >
                      <div
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        Attention:
                      </div>
                      <div
                        style={{
                          fontSize: '0.8em'
                        }}
                      >
                        You are about to delete this level, 
                        how do you want to procede?
                      </div>
                      <div
                        style={{
                          marginTop: '0.5em'
                        }}
                      >
                        <Form>
                          <Form.Field>
                            <Radio
                              checked={this.state.deleteAction === 0}
                              label='Just delete this layer'
                              name='radioGroup'
                              onChange={this.handleDeleteAction}
                              value={0}
                            />
                          </Form.Field>
                          {
                            idx > 0?
                              <Form.Field>
                                <Radio
                                  checked={this.state.deleteAction === 1}
                                  label='Extend upper layer to bottom'
                                  name='radioGroup'
                                  onChange={this.handleDeleteAction}
                                  value={1}
                                />
                              </Form.Field>: null
                          }
                          {
                            (idx + 1) < length?
                              <Form.Field>
                                <Radio
                                  checked={this.state.deleteAction === 2}
                                  label='Extend lower layer to top'
                                  name='radioGroup'
                                  onChange={this.handleDeleteAction}
                                  value={2}
                                />
                              </Form.Field>: null
                          }
                          {
                            idx > 0?
                              <Form.Field>
                                <Radio
                                  checked={this.state.deleteAction === 3}
                                  label='Set manually'
                                  name='radioGroup'
                                  onChange={this.handleDeleteAction}
                                  value={3}
                                />
                              </Form.Field>: null
                          }
                          {
                            idx > 0?
                              <Form.Field>
                                <Input
                                  disabled={this.state.deleteAction !== 3}
                                  onChange={this.handleValue}
                                  ref={this.inputRef}
                                  type="number"
                                />
                              </Form.Field>: null
                          }
                        </Form>
                      </div>
                      <div
                        style={{
                          marginTop: '0.5em',
                          textAlign: 'right'
                        }}
                      >
                        <Button
                          basic
                          icon
                          onClick={(e)=>{
                            e.stopPropagation();
                            this.setState({
                              deleting: null,
                              deleteAction: 0,
                              value: null
                            });
                          }}
                          size='mini'
                        >
                          <Icon name='cancel' /> Cancel
                        </Button>
                        <Button
                          icon
                          negative
                          onClick={(e)=>{
                            e.stopPropagation();
                            const deleteAction = this.state.deleteAction;
                            const value = _.isNil(this.state.value) === false?
                              parseFloat(this.state.value): null;
                            this.setState({
                              deleting: null,
                              deleteAction: 0,
                              value: value
                            }, () => {
                              this.props.onDelete(
                                item, deleteAction, value
                              );
                            });
                          }}
                          size='mini'
                        >
                          <Icon name='trash alternate outline' /> Confirm
                        </Button>
                      </div>
                    </Table.Cell>
                    
                  </Table.Row>
                );
              } else {
                ret.push(
                  (
                    <Table.Row
                      active={item.id === this.props.selected}
                      key={'ll-rw-'+idx}
                      onClick={()=>{
                        if (_.isFunction(this.props.onSelected)){
                          this.setState({
                            resolving: null,
                            resolvingAction: null,
                            deleting: null,
                            deleteAction: 0,
                            value: null
                          }, () => {
                            this.props.onSelected(item);
                          });
                        }
                      }}
                      style={{
                        cursor: 'pointer',
                        borderTop: (
                          isBedrock &&
                          (
                            idx > 0
                            || item.depth_from === 0
                          )
                        )?
                          '2px dashed #787878': null
                      }}
                    >
                      <Table.Cell
                        collapsing
                        style={{
                          maxWidth: '40px',
                          width: '40px',
                          minWidth: '40px',
                          backgroundColor: (
                            item.unknown === true ||
                            style.color === null
                          )?
                            null: this.getColor(item[style.color]),
                          backgroundImage: (
                            item.unknown === true ||
                            style.pattern === null
                          )?
                            null: this.getPattern(item[style.pattern]),
                          backgroundSize: 'cover'
                        }}
                      />
                      <Table.Cell
                        collapsing
                        style={{
                          width: '100%'
                        }}
                      >
                        <div
                          style={{
                            color: (
                              _.isNil(item.depth_from) || (
                                idx > 0 &&
                                layers[(idx-1)].depth_to !== item.depth_from
                              )?
                                'red': null // '#787878'
                            ),
                            // fontSize: '0.8em'
                          }}
                        >
                          {
                            _.isNil(item.depth_from) || (
                              idx > 0 &&
                              layers[(idx-1)].depth_to !== item.depth_from
                            )?
                              <Icon name='warning sign' />: null
                          } {item.depth_from} m
                        </div>
                        <div
                          style={{
                            fontSize: '1.1em',
                            fontWeight: 'bold',
                            color: (
                              isBedrock
                              && consistency.hasOwnProperty(
                                'bedrockLitStratiWrong'
                              )?
                                'red': null
                            )
                          }}
                        >
                          {
                            item[style.pattern] !== null?
                              <DomainText
                                id={item[style.pattern]}
                                schema={style.patternNS}
                              />: '-'
                          }
                        </div>
                        <div
                          style={{
                            color: (
                              isBedrock
                              && consistency.hasOwnProperty(
                                'bedrockChronoWrong'
                              )?
                                'red': 'rgb(78, 78, 78)'
                            ),
                            fontSize: '0.9em'
                          }}
                        >
                          {
                            item.chronostratigraphy !== null?
                              <DomainText
                                id={item.chronostratigraphy}
                                schema='custom.chro_str_top_bedrock'
                              />: '-'
                          }
                        </div>
                        <div
                          style={{
                            color: (
                              isBedrock
                              && consistency.hasOwnProperty(
                                'bedrockLitPetWrong'
                              )?
                                'red': '#787878'
                            ),
                            fontSize: '0.8em'
                          }}
                        >
                          {
                            item.lithology !== null?
                              <DomainText
                                id={item.lithology}
                                schema='custom.lit_pet_top_bedrock'
                              />: '-'
                          }
                        </div>
                        <div
                          style={{
                            color: (
                              _.isNil(item.depth_to) || (
                                consistency.hasOwnProperty(item.id)
                                && consistency[item.id].errorInverted
                              )?
                                'red': null // '#787878'
                            )
                          }}
                        >
                          {
                            _.isNil(item.depth_to) || (
                              consistency.hasOwnProperty(item.id)
                              && consistency[item.id].errorInverted
                            )?
                              <Icon
                                name='warning sign'
                                title={
                                  consistency.hasOwnProperty(item.id)
                                  && consistency[item.id].errorInverted?
                                    'Inverted depths': null
                                }
                              />: null
                          } {item.depth_to} m
                        </div>
                      </Table.Cell>
                      {
                        _.isFunction(this.props.onDelete)?
                          <Table.Cell
                            collapsing
                          >
                            {
                              borehole.data.lock === null
                              || borehole.data.lock.username
                                 !== this.props.user.data.username?
                                null:
                                <Button
                                  basic
                                  color='red'
                                  icon
                                  onClick={(e)=>{
                                    e.stopPropagation();
                                    this.setState({
                                      resolving: null,
                                      resolvingAction: null,
                                      deleting: item,
                                      deleteAction: 0,
                                      value: null
                                    });
                                  }}
                                  size='mini'
                                >
                                  <Icon name='trash alternate outline' />
                                </Button>
                            }
                          </Table.Cell>: null
                      }
                    </Table.Row>
                  )
                );
              }
              return ret;
            })
          }
          {
            (
              () => {

                const ret = [];
  
                if (consistency.missingBedrock === true) {
                  const resolving = this.state.resolving !== null
                    && this.state.resolving.id === 'missingBedrock';

                  ret.push(
                    <Table.Row
                      active={false}
                      key={'ll-info-mb'}
                      negative
                      style={{
                        cursor: 'pointer'
                      }}
                    >
                      <Table.Cell
                        colSpan={
                          resolving === true?
                            '3': _.isFunction(this.props.onDelete)?
                              '2': '1'
                        }
                        collapsing
                        style={{
                          width: '100%'
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 'bold'
                          }}
                        >
                          <Icon name='warning sign' /> {t('missingBedrock')}
                        </div>
                        {
                          resolving === true?
                            <div>
                              <div
                                style={{
                                  fontSize: '0.8em'
                                }}
                              >
                                {t('howToResolve')}
                              </div>
                              <div
                                style={{
                                  marginTop: '0.5em',
                                  whiteSpace: 'normal'
                                }}
                              >
                                {t('missingBedrockSolution')}
                              </div>
                              <div
                                style={{
                                  marginTop: '0.5em',
                                  textAlign: 'right'
                                }}
                              >
                                <Button
                                  basic
                                  icon
                                  onClick={(e)=>{
                                    e.stopPropagation();
                                    this.setState({
                                      resolving: null,
                                      resolvingAction: null
                                    });
                                  }}
                                  size='mini'
                                >
                                  <Icon name='cancel' /> Cancel
                                </Button>
                                <Button
                                  icon
                                  onClick={(e)=>{
                                    e.stopPropagation();
                                    this.setState({
                                      resolving: null,
                                      resolvingAction: null
                                    }, ()=>{
                                      this.props.onAddBedrock();
                                    });
                                  }}
                                  secondary
                                  size='mini'
                                >
                                  <Icon name='plus' /> Add
                                </Button>
                              </div>
                            </div>: null
                        }
                      </Table.Cell>
                      {
                        resolving === false?
                          <Table.Cell
                            collapsing
                          >
                            <Button
                              basic
                              icon
                              onClick={(e)=>{
                                e.stopPropagation();
                                this.setState({
                                  resolving: {
                                    id: 'missingBedrock'
                                  },
                                  resolvingAction: null,
                                  deleting: null,
                                  deleteAction: 0,
                                  value: null
                                });
                              }}
                              size='mini'
                            >
                              <Icon name='wrench' />
                            </Button>
                          </Table.Cell>: null
                      }
                    </Table.Row>
                  );
                }

                if (consistency.wrongDepth === true) {
                  const resolving = this.state.resolving !== null
                    && this.state.resolving.id === 'wrongDepth';

                  ret.push(
                    <Table.Row
                      active={false}
                      key={'ll-info-wd'}
                      negative
                      style={{
                        cursor: 'pointer'
                      }}
                    >
                      <Table.Cell
                        colSpan={
                          resolving === true?
                            '3': '2'
                        }
                        collapsing
                        style={{
                          width: '100%'
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 'bold'
                          }}
                        >
                          <Icon name='warning sign' /> {t('wrongDepth')}
                        </div>
                        {
                          resolving === true?
                            <div>
                              <div
                                style={{
                                  marginTop: '0.5em',
                                  whiteSpace: 'normal'
                                }}
                              >
                                {t(
                                  'wrongDepthSolution1',
                                  {
                                    lDepth: (
                                      _.isNil(layers[layers.length-1].depth_to)?
                                        'n/a': layers[layers.length-1].depth_to
                                    ),
                                    bDepth: (
                                      _.isNil(borehole.data.length)?
                                        'n/a': borehole.data.length + 'm'
                                    )
                                  }
                                )}
                              </div>
                              <div
                                style={{
                                  marginTop: '0.5em',
                                  textAlign: 'right'
                                }}
                              >
                                <Button
                                  basic
                                  onClick={(e)=>{
                                    e.stopPropagation();
                                    this.setState({
                                      resolving: null,
                                      resolvingAction: null
                                    });
                                  }}
                                  size='mini'
                                >
                                  Close
                                </Button>
                              </div>
                            </div>: null
                        }
                      </Table.Cell>
                      {
                        resolving === false?
                          <Table.Cell
                            collapsing
                          >
                            <Button
                              basic
                              icon
                              onClick={(e)=>{
                                e.stopPropagation();
                                this.setState({
                                  resolving: {
                                    id: 'wrongDepth'
                                  },
                                  resolvingAction: null,
                                  deleting: null,
                                  deleteAction: 0,
                                  value: null
                                });
                              }}
                              size='mini'
                            >
                              <Icon name='wrench' />
                            </Button>
                          </Table.Cell>: null
                      }
                    </Table.Row>
                  );
                }
                return ret;
              }
            )()
          }
        </Table.Body>
      </Table>
    );
  }
}

LayersList.propTypes = {
  borehole: PropTypes.object,
  color: PropTypes.string,
  consistency: PropTypes.object,
  domains: PropTypes.shape({
    data: PropTypes.object
  }),
  layers: PropTypes.array,
  onAddBedrock: PropTypes.func,
  onDelete: PropTypes.func,
  onResolve: PropTypes.func,
  onSelected: PropTypes.func,
  selected: PropTypes.number,
  style: PropTypes.shape({
    color: PropTypes.string,
    colorNS: PropTypes.string,
    pattern: PropTypes.string,
    patternNS: PropTypes.string
  }),
  user: PropTypes.object
};

LayersList.defaultProps = {
  consistency: {},
  layers: []
};

const mapStateToProps = (state) => {
  return {
    borehole: state.core_borehole,
    domains: state.core_domain_list,
    user: state.core_user,
  };
};

export default connect(
  mapStateToProps,
  null
)((
  withTranslation('error')(LayersList)
));
