import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Helmet} from "react-helmet";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
    return (
        <Router>
            <Helmet>
                <title>netflix</title>
            </Helmet>
            <Header />
            <Switch>
                <Route path={["/tv", "/tv/:tvId"]}>
                    <Tv />
                </Route>
                <Route path="/search">
                    <Search />
                </Route>
                <Route path={["/", "/movies/:movieId"]}>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
