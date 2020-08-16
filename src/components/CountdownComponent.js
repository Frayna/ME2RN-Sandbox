import React, { useState, useEffect } from 'react';
import "./css/Countdown.css"


function dateDiff(date1, date2){
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;

    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;
     
    return diff;
}

const srsTime = 1602756000000;

export default function CountDownComponent() {

	const [actualTime, setTime] = useState(Date.now());
	const diff = dateDiff(actualTime, srsTime);

	useEffect(() => {
		
		// code to run on component mount

		setTimeout(() => {
			setTime(Date.now());
		}, 1000)
	}, [actualTime]);

	return(
		<div className="Counter">
			{diff.day + "j " + diff.hour + " h "  + diff.min + " min "  + diff.sec + " s"}
		</div>
	)
}