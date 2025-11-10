import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Routes from './pages/Routes';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import MapView from './components/MapView/MapView';
import RouteComparison from './components/RouteComparison/RouteComparison';
import Heatmap from './components/Heatmap/Heatmap';
import POIExplorer from './components/POIExplorer/POIExplorer';
import ReportBuilder from './components/ReportBuilder/ReportBuilder';
import './styles/global.css';
import './styles/fonts.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/routes" component={Routes} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/settings" component={Settings} />
          <Route path="/map" component={MapView} />
          <Route path="/compare" component={RouteComparison} />
          <Route path="/heatmap" component={Heatmap} />
          <Route path="/poi" component={POIExplorer} />
          <Route path="/report" component={ReportBuilder} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;