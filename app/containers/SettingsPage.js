import * as React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

const clearCache = () => {
  localStorage.clear();
};

export default function SettingsPage(props) {
  return (
    <div className="SettingsPage">
      <div className="TopRightNav">
        <Link to={routes.HOME}>&#x1F3E0;back</Link>
      </div>
      <div className="SettingsPage__container">
        <h1>Settings</h1>

        <div>
          <button onClick={clearCache}>Clear cache</button>
        </div>
      </div>
    </div>
  );
}
