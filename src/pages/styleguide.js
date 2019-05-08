import React from 'react';

import Main from '../layouts/main';

const StyleGuide = () => {
  return (
    <Main>
      <div className="view">
        <div className="container">
          <button className="btn">Button</button>
          <button className="btn btn--primary">Primary Button</button>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Email Address" className="input"/>
                <small className="form-text">This is helper text</small>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="select">Select</label>
                <select name="seled" id="select" className="input">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="checkbox">
                  <input type="checkbox" id="checkbox"/>
                  <label htmlFor="checkbox">Checkbox</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default StyleGuide;
