import React, { Component } from 'react';
import {
  Row,
  Col,
  Steps,
  Progress,
  Card,
  Button,
  Collapse,
  Slider,
  InputNumber
} from 'antd';

import excercises from '../data/excercises';
import { ExcercisesContext } from '../contexts/ExcercisesContext';
import capitalizeFirstLetter from '../util/capitalize-first-letter';
import repsFromDay from '../util/reps-from-day';
import Timer from '../components/Timer';

const Step = Steps.Step;
const Panel = Collapse.Panel;

class Workout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentExcercise: 0,
      currentSet: 0,
      isBreak: false,
      breakTime: 60
    };
  }

  getPercentDone = () => {
    const { currentExcercise, currentSet } = this.state;
    return Math.floor((currentExcercise * 3 + currentSet) / 0.21);
  };

  nextExcercise = () => {
    this.setState({
      ...this.state,
      currentExcercise: this.state.currentExcercise + 1,
      currentSet: 0,
      isBreak: true
    });
  };

  nextSet = () => {
    if (this.state.isBreak) {
      return;
    }
    if (this.state.currentSet >= 2) {
      this.nextExcercise();
    } else {
      this.setState({
        ...this.state,
        currentSet: this.state.currentSet + 1,
        isBreak: true
      });
    }
  };

  endBreak = () => {
    this.setState({
      ...this.state,
      isBreak: false
    });
  };

  onBreakChange = value => {
    this.setState({ ...this.state, breakTime: value });
  };

  render() {
    const { current } = this.props;
    const { currentExcercise, currentSet, isBreak, breakTime } = this.state;
    const excerciseType = Object.keys(current)[currentExcercise];
    const excerciseProgress = current[excerciseType];
    const excercise =
      excercises[excerciseType].progressions[excerciseProgress.progression];

    return (
      <React.Fragment>
        <Collapse bordered={false} style={{marginBottom: 30}}>
          <Panel header="Settings" key="1">
            <Row>
              <Col span={3}>
                <p>Break time</p>
              </Col>
              <Col span={12}>
                <Slider
                  min={30}
                  max={180}
                  onChange={this.onBreakChange}
                  value={this.state.breakTime}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={30}
                  max={180}
                  style={{ marginLeft: 16 }}
                  value={this.state.breakTime}
                  onChange={this.onBreakChange}
                />
              </Col>
            </Row>
          </Panel>
        </Collapse>
        <Progress
          percent={this.getPercentDone()}
          style={{ marginBottom: 30 }}
        />

        <Row gutter={16}>
          <Col span={5}>
            <Steps direction="vertical" current={currentExcercise}>
              {Object.keys(current)
                .filter(item => item !== 'dips')
                .map((type, index) => (
                  <Step
                    key={type}
                    title={capitalizeFirstLetter(type)}
                    description={
                      excercises[type].progressions[
                        excerciseProgress.progression
                      ].name
                    }
                  />
                ))}
            </Steps>
          </Col>
          <Col span={5}>
            <Steps size="small" direction="vertical" current={currentSet}>
              {repsFromDay(excerciseProgress.day)
                .split(' ')
                .map((rep, index) => (
                  <Step key={index} title={'Set'} description={`${rep} reps`} />
                ))}
            </Steps>
          </Col>
          <Col span={10}>
            <Card
              title={[excercise.name]}
              bordered={false}
              style={{ marginBottom: 16 }}
            >
              <img src={`/images/${excerciseType}/${excercise.image}`} alt="" />
            </Card>
            <Button
              type="primary"
              size="large"
              onClick={this.nextSet}
              disabled={isBreak}
            >
              Next set
            </Button>
            <small style={{ marginLeft: 15 }}>Shortcut: Space</small>

            {isBreak ? <Timer seconds={breakTime} onFinished={this.endBreak} /> : ''}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default props => (
  <ExcercisesContext.Consumer>
    {contextProps => <Workout {...props} {...contextProps} />}
  </ExcercisesContext.Consumer>
);
