import React, { useState, useEffect } from 'react';
import axios from "axios";
import TableComponent from './utils/TableComponent';



export default function CovidComponent() {


	const litRea = 1200;
	const litHospit = 68000;
	const array1 = [1, 2, 3, 4];
	const [status, setStatus] = useState([])
	const [clear, setClear] = useState([])


	// Get Covid Data from API and Refresh the Component with the new state
	useEffect(() => {
		axios.get('https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=Île-de-France',{
			headers: {	
						'Accept' : 'application/json'
			},
		})
		.then(response => {
			setStatus(response.data.allDataByDepartement.splice(response.data.allDataByDepartement.length - 8));
		})
		.catch(function (error) {
			console.debug(error);
		})
	},[])

	// Treat the data received and refresh the Component
	useEffect(() => {
		setClear(Array.from(status, e => ({date : e.date, rea : e.reanimation, hospit : e.hospitalises})));		
	}, [status])

	const changeData = (value) => {
		console.log("TESt", value);
		setClear(value);
	};

	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	console.log("TEST", array1.reduce(reducer)/array1.length)
	return(
		<div>
			<TableComponent data={clear} onChange={changeData} />
		</div>
	)

}