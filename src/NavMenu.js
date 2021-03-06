import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import { data } from './contexts/ExcercisesContext';
import { capitalizeFirstLetter } from './util';

const { SubMenu } = Menu;

const NavMenu = () => (
  <Route
    render={({ location }) => (
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="play-circle-o" />
            Workout
          </Link>
        </Menu.Item>
        <Menu.Item key="/my-progress">
          <Link to="/my-progress">
            <Icon type="schedule" />
            My progressions
          </Link>
        </Menu.Item>
        <SubMenu
          key="progression"
          title={
            <span>
              <Icon type="line-chart" />
              Progressions
            </span>
          }
        >
          {Object.keys(data).map(type => (
            <Menu.Item key={`/progression/${type}`}>
              <Link to={`/progression/${type}`}>
                {capitalizeFirstLetter(type)}
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    )}
  />
);

export default NavMenu;
