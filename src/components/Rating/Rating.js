import React from "react";
import { Route, Switch, Link } from "react-router-dom";

function Rating(props) {
	// following Item.js
	console.log("Jesse Check" + props.newRatingState);
	let example = props.newRatingState;
	let renderRatings = "Loading...";
	// let renderSubArray = '';
	if (props.newRatingState) {
		renderRatings = example.map((rating) => {
			// renderSubArray = subarray.ratings.map((rating, index) => {
			return (
				<div>
					<p>Name: {rating.name}</p>
					<p>Date: {rating.date}</p>
					<p>Stars: {rating.stars}</p>
					<p>Comment: {rating.comment}</p>

					<Link to="/">
						<button
							onClick={() => {
								props.history.push("/ratings");
							}}
						>
							Add
						</button>
					</Link>

					<Link to="/">
						<button
							onClick={() => {
								props.history.push(`${props.match.url}/edit`);
							}}
						>
							Edit
						</button>
					</Link>

					<Link to="/">
						<button
							onClick={() => {
								props.deleteRating(rating);
							}}
						>
							Delete
						</button>
					</Link>
				</div>
			);
			// });
			// return [renderSubArray];
		});
	}
	return (
		<>
			<h1>Rating Component</h1>
			{renderRatings}
		</>
	);
}

export default Rating;