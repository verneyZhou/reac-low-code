
import './App.css';
import { LowCodeEditor } from './pages/LowCodeEditor';
import {PagePreview} from './pages/PagePreview'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



const routes = [
  {
    path: "/create",
    component: LowCodeEditor
  },
  {
    path: "/page/:id",
    component: PagePreview
  },
  {
    path: "/editor/:id",
    component: LowCodeEditor
  }
]


function App() {
  return (
    <div className="App h-screen">
      {/* <LowCodeEditor /> */}
      <Router>
        <Switch>
          {/* {
            routes.map((route, index) => {
              const Component = route.component
              return (
                <Route key={index} path={route.path}>
                <Component key={index}/>
              </Route>
              )
            })
          } */}
          <Route path="/page/:id">
            <PagePreview />
          </Route>
          <Route path="/editor/:id">
            <LowCodeEditor />
          </Route>
          <Route path="/create">
            <LowCodeEditor />
          </Route>
          <Route path="/">
            <LowCodeEditor />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
