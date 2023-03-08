import {Route, Switch, Redirect} from 'react-router-dom'
import TechEra from './components/TechEra'
import Technology from './components/Technology'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route exact path="/courses/:id" component={Technology} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
