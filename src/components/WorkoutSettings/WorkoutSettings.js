import React from 'react';
import { Row, Col, Collapse, Slider, InputNumber, Radio } from 'antd';

const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const WorkoutSettings = ({ actions, settings }) => (
  <Collapse bordered={false} style={{ marginBottom: 30 }}>
    <Panel header="Settings" key="1">
      <hr style={{ opacity: 0.2, marginBottom: 25 }} />
      <Row>
        <Col span={4}>
          <p style={{ lineHeight: 2.3 }}>Sound</p>
        </Col>
        <Col span={10}>
          <RadioGroup
            onChange={actions.setPlaySound}
            defaultValue={settings.playSound}
          >
            <RadioButton value={true}>On</RadioButton>
            <RadioButton value={false}>Off</RadioButton>
          </RadioGroup>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <p style={{ lineHeight: 2.3 }}>Skipped excercise</p>
        </Col>
        <Col span={10}>
          <RadioGroup
            onChange={actions.setSkipped}
            defaultValue={settings.skip}
          >
            <RadioButton value="dips">Dips</RadioButton>
            <RadioButton value="push-ups">Pushups</RadioButton>
          </RadioGroup>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <p style={{ lineHeight: 2.5 }}>Rest time</p>
        </Col>
        <Col span={16}>
          <Slider
            min={30}
            max={180}
            onChange={actions.setBreak}
            value={settings.breakTime}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={30}
            max={180}
            style={{ marginLeft: 16, marginRight: 6 }}
            value={settings.breakTime}
            onChange={actions.setBreak}
          />
          seconds
        </Col>
      </Row>
    </Panel>
  </Collapse>
);

export default WorkoutSettings;
