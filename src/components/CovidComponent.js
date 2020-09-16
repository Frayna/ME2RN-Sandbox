import React, { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./utils/TableComponent";
import CovidMonitorComponent from "./CovidMonitorComponent";

import "./css/Covid.css";

export default function CovidComponent() {
	const litRea = 1200;
	const litHospit = 68000;
	const array1 = [1, 2, 3, 4];
	const [status, setStatus] = useState([]);
	const [table, setTable] = useState([]);
	const [hospit, setHospit] = useState({});
	const [rea, setRea] = useState({});

	// Get Covid Data from API and Refresh the Component with the new state
	useEffect(() => {
		axios
			.get(
				"https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=Île-de-France",
				{
					headers: {
						Accept: "application/json",
					},
				}
			)
			.then((response) => {
				setStatus(
					response.data.allDataByDepartement.splice(
						response.data.allDataByDepartement.length - 8
					)
				);
			})
			.catch(function (error) {
				console.debug(error);
			});
	}, []);

	// Process the data received and refresh the Component
	useEffect(() => {
		if (status.length) {
			setTable(
				Array.from(status, (e) => ({
					Date: e.date,
					Reanimations: e.reanimation,
					Charge_Rea:
						Math.floor((e.reanimation / litRea) * 10000) / 100,
					Hospitalisations: e.hospitalises,
					Charge_Hospit:
						Math.floor((e.hospitalises / litHospit) * 10000) / 100,
				}))
			);
			const clear = Array.from(status, (e) => ({
				Date: e.date,
				Reanimations: e.reanimation,
				Hospitalisations: e.hospitalises,
			}));
			const first4 = clear.slice(clear.length - 8, clear.length - 4);
			const first_4rea = Array.from(first4, (e) => e.Reanimations);
			const first_4hospit = Array.from(first4, (e) => e.Hospitalisations);
			const last4 = clear.slice(4);
			const last_4rea = Array.from(last4, (e) => e.Reanimations);
			const last_4hospit = Array.from(last4, (e) => e.Hospitalisations);

			const first_rea_average =
				first_4rea.reduce((acc, curr) => acc + curr) /
				first_4rea.length;
			const first_hospit_average =
				first_4hospit.reduce((acc, curr) => acc + curr) /
				first_4hospit.length;
			const last_rea_average =
				last_4rea.reduce((acc, curr) => acc + curr) / last_4rea.length;
			const last_hospit_average =
				last_4hospit.reduce((acc, curr) => acc + curr) /
				last_4hospit.length;
			const hospit_tendency = last_hospit_average - first_hospit_average;
			const rea_tendency = last_rea_average - first_rea_average;

			// 68000 lit hospit en RP et 1200 lit rea
			setHospit({
				actual: clear[clear.length - 1].Hospitalisations,
				max: litHospit,
				charge: clear[clear.length - 1].Hospitalisations / litHospit,
				tendency: Math.trunc((hospit_tendency / 2) * 100) / 100,
			});
			setRea({
				actual: clear[clear.length - 1].Reanimations,
				max: litRea,
				charge: clear[clear.length - 1].Reanimations / litRea,
				tendency: Math.trunc((rea_tendency / 2) * 100) / 100,
			});
		}
	}, [status]);

	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	console.log("TEST", array1.reduce(reducer) / array1.length);
	return status.length ? (
		<div className="Covid_container" style={{flexDirection:"column"}}>
			<div>
				<TableComponent data={table} onChange={(e) => setTable(e)} />
			</div>
			<div className="Covid_container">
				<div className="Covid_block">
					<CovidMonitorComponent title="Reanimations" state={rea} />
				</div>
				<div className="Covid_block">
					<CovidMonitorComponent
						title="Hospitalisations"
						state={hospit}
					/>
				</div>
			</div>
		</div>
	) : (
		<div className="Covid_container" style={{ color: "white" }}>
			Waiting Covid API...
		</div>
	);
}
