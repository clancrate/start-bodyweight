import React, { Component } from 'react';
import { Row, Col, Steps, Progress, Button } from 'antd';

import { data, ExcercisesContext } from '../contexts/ExcercisesContext';
import capitalizeFirstLetter from '../util/capitalize-first-letter';
import repsFromDay from '../util/reps-from-day';
import Timer from '../components/Timer';
import WorkoutSettings from '../components/WorkoutSettings';

const Step = Steps.Step;

class Workout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      excercises: Object.keys(this.props.current).filter(
        item => item !== this.props.workoutSettings.skip
      ),
      currentExcercise: 6,
      currentSet: 0,
      isBreak: false,
      isPlanking: false,
      isFinished: false
    };
  }

  getPercentDone = () => {
    const { currentExcercise, currentSet } = this.state;
    return Math.floor((currentExcercise * 3 + currentSet) / 0.19);
  };

  nextExcercise = () => {
    this.setState(prevState => ({
      currentExcercise: prevState.currentExcercise + 1,
      currentSet: 0
    }));
  };

  nextSet = () => {
    if (this.state.isBreak) {
      return;
    }
    if (this.state.currentSet >= 2) {
      this.nextExcercise();
    } else {
      this.setState(prevState => ({
        currentSet: prevState.currentSet + 1,
        isBreak: true
      }));
    }
  };

  endBreak = () => {
    this.setState({
      isBreak: false
    });
  };

  startPlank = () => {
    this.setState({
      isPlanking: true
    });
  };

  workoutFinished = () => {
    this.nextSet();
    this.setState({
      isFinished: true
    });
  };

  render() {
    const { current, actions, workoutSettings } = this.props;
    const {
      currentExcercise,
      currentSet,
      isBreak,
      isPlanking,
      isFinished,
      excercises
    } = this.state;
    const excerciseType = excercises[currentExcercise];
    const excerciseProgress = current[excerciseType];
    const excercise =
      data[excerciseType].progressions[excerciseProgress.progression];
    const isPlank = excerciseType === 'planks';
    const plankTime = 30 + 5 * excerciseProgress.day;

    return (
      <React.Fragment>
        <WorkoutSettings
          actions={actions.settings}
          settings={workoutSettings}
        />

        <div style={{ backgroundColor: 'white', padding: 30 }}>
          <Progress
            percent={this.getPercentDone()}
            style={{ marginBottom: 30 }}
          />
          <Row gutter={16}>
            <Col span={5}>
              <Steps
                direction="vertical"
                current={isFinished ? currentExcercise + 1 : currentExcercise}
              >
                {excercises.map(type => (
                  <Step
                    key={type}
                    title={capitalizeFirstLetter(type)}
                    description={
                      data[type].progressions[excerciseProgress.progression]
                        .name
                    }
                  />
                ))}
              </Steps>
            </Col>
            <Col span={5}>
              <Steps size="small" direction="vertical" current={currentSet}>
                {isPlank ? (
                  <Step title={'Set'} description={`${plankTime} seconds`} />
                ) : (
                  repsFromDay(excerciseProgress.day)
                    .split(' ')
                    .map((rep, index) => (
                      <Step
                        key={index}
                        title={'Set'}
                        description={`${rep} reps`}
                      />
                    ))
                )}
              </Steps>
            </Col>
            {isFinished ? (
              <Col span={10}>Workout finished! Congratulations!</Col>
            ) : (
              <Col span={10}>
                <h2 style={{ marginBottom: 16 }}>{excercise.name}</h2>
                <img
                  src={`/images/${excerciseType}/${excercise.image}`}
                  alt=""
                />
                <hr style={{ opacity: 0.2, marginTop: 30, marginBottom: 30 }} />
                {isPlank ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={this.startPlank}
                    disabled={isPlanking}
                  >
                    {isPlanking ? (
                      <React.Fragment>
                        Hold for{' '}
                        <Timer seconds={1} onFinished={this.workoutFinished} />s
                      </React.Fragment>
                    ) : (
                      'Start the timer'
                    )}
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={this.nextSet}
                    disabled={isBreak}
                  >
                    {isBreak ? (
                      <React.Fragment>
                        Rest{' '}
                        <Timer
                          seconds={workoutSettings.breakTime}
                          onFinished={this.endBreak}
                        />s
                      </React.Fragment>
                    ) : (
                      'Next set'
                    )}
                  </Button>
                )}
              </Col>
            )}
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default props => (
  <ExcercisesContext.Consumer>
    {contextProps => <Workout {...props} {...contextProps} />}
  </ExcercisesContext.Consumer>
);
