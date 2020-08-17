import "./css/Covid.css";
import React, { useState, useEffect } from "react";

export default function CovidMonitorComponent({ title, state }) {
	console.log(state);

	return (
		<div className="Covid_monitor">
			<div>{title}</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					verticalAlign: "middle",
				}}
			>
				<div className="Covid_micro_card">
					<p>Load</p>
					<p style={{ fontWeight: "bold" }}>{Math.floor(state.charge * 10000) / 100} %</p>
				</div>
				<div className="Covid_micro_card">
					<p>Tendency</p>
					<p style={{ fontWeight: "bold" }}>
						{state.tendency > 0
							? "+ " + state.tendency
							: "- " + Math.abs(state.tendency)}{" "}
						{state.tendency > 0 ? (
							<span style={{ color: "red", fontWeight: "bold" }}>
								⬈
							</span>
						) : (
							<span
								style={{ color: "green", fontWeight: "bold" }}
							>
								⬊
							</span>
						)}
					</p>
				</div>
			</div>
			<div>
				{state.actual} / {state.max}
			</div>
		</div>
	);
}
