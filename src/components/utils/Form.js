import React from "react";
import './Utils.css'
export default function Form(props){

	return(
		<div className="Container">
			<div className="Form-content">
				<div className="Form">
					{props.children}
				</div>
			</div>
		</div>
	)
}