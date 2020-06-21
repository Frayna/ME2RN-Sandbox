import React from "react";

export default function SelectField(props){
	return(
		<select className={props.className} style={props.style}>
			<option value="" className={props.optionClass} disabled selected hidden>{props.value}</option>
			{props.values ? props.values.map((e) => {return <option value={e} className={props.optionClass}>{e}</option>}):null}
		</select>
	)
}
