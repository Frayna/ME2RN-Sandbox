import React from "react";
import "./App.css";
import CountDownComponent from "./components/CountdownComponent";
import CovidComponent from "./components/CovidComponent";

function App() {
	return <div className="App-content">
		<CountDownComponent />
		<CovidComponent />
	</div>;
}

export default App;
