import React, {useEffect, useRef, useState} from 'react';

import './App.css'
import MultiForm from "./components/utils/Form";
import TextField from "./components/utils/TextField";
import SelectField from "./components/utils/SelectField";

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
			<MultiForm>
				<div className="Title-container">
					<div className="Form-title Form-title-active">Coordonnées</div>
					<div className="Form-title">Avis</div>
					<div className="Form-title">Resultats</div>
					<div className="Form-title">Tarif</div>
					<div className="Form-title">Commentaires</div>
				</div>
				<div className="Container-col">
					<div className="Container Container-line">
						<TextField className="Textfield" value="Nom"/>
						<TextField className="Textfield" value="Prenom"/>
					</div>
					<div className="Container Container-line">
						<TextField className="Textfield" style={{width:"100%"}} value="Adresse"/>
					</div>
					<div className="Container Container-line">
						<TextField className="Textfield" style={{width:"100%"}} value="Ville"/>
					</div>
					<div className="Container Container-line">
						<SelectField className="Textfield Selectfield" optionClass="Optionfield" value="Spécialité" values={["Endocrinologue", "Chirurgien"]} style={{width:"100%"}}/>
						<TextField className="Textfield" value="Telephone"/>
					</div>
				</div>
				<div className="Container Container-out">
					<button className="Button-std Form-button" type="button" disabled={true}>Précédent</button>
					<button className="Button-std Form-button" type="button">Suivant</button>
				</div>
			</MultiForm>
		</div>
	);
}

export default App;
