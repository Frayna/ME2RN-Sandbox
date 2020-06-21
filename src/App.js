import React, {useEffect, useRef, useState} from 'react';

import './App.css'
import MultiForm from "./components/utils/Form";
import TextField from "./components/utils/TextField";
import SelectField from "./components/utils/SelectField";
import BlogComponent from "./components/utils/BlogComponent";

function App() {
	const [medecin, setMedecin] = useState({
		coordonnees: {
			nom: "",
			prenom: "",
			specialite: "",
			doctolib: false,
			telephone: "",
		},
		evaluationMedecin: {},
		evaluationResultats: {},
		tarif: {
			ald: false,
			prixconsult: 0
		},
		commentaire: ""
	})

	const [slider, setSlider] = useState(true);
	const [style, setStyle] = useState({
		overflow: "hidden", 
		position: "fixed", 
		right: "0rem",
		transform: "translate(20rem)",
	});
	useEffect(() => {
		// code to run on component mount

	}, []);


	const wrapperRef = useRef();

	const trigger = () => {
		wrapperRef.current.valueOf().classList.toggle('hide');
	};

	const hide = () => {
		setSlider(!slider);
		slider ? setStyle({...style, transform: "translate(0rem)"}) : setStyle({...style, transform: "translate(20rem)"});
	};

	return (
		<div className="App-content">
				<div className={"Wrapper"} style={style}>
					<div className={"Store"} style={{pointerEvents: "auto"}}>
						<div className={"Store-title"}>
							Title
						</div>
						<div className={"Store-content"}>
						</div>
					</div>
					<div className="Store-button-hide" onClick={hide} style={{pointerEvents: "auto"}}>
						<div className="Store-button-content">{slider ? "<" : ">"}</div>
					</div>
			</div>
		</div>
	);
}

export default App;
