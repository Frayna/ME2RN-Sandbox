import React from "react";

export default function TextField(props){
	return(
			<input className={props.className} style={props.style} type="text" placeholder={props.value} />
	)
}
