import React from "react";
import ItemForm from "../ItemForm/ItemForm";
import Item from "../Item/Item";
import { Route, Switch, Link } from "react-router-dom";
import "./ItemList.css";

function ItemList(props) {
	const id = props.match.params.id;

	const url = "https://aa-palate-backend.herokuapp.com/";

	const [resItems, setResItems] = React.useState([]);

	const [newItemState, setNewItemState] = React.useState([]);

	//EMPTY ITEM
	const emptyItem = {
		name: "",
		type: "",
		img: "",
	};

	const [selectedItem, setSelectedItem] = React.useState(emptyItem);

	const [form, setForm] = React.useState(emptyItem);

	const [isDeleted, setIsDeleted] = React.useState(false);

	// GET LIST OF ITEMS FUNCTION
	const getItems = () => {
		fetch(url + "items/")
			.then((response) => response.json())
			.then((data) => {
				setResItems(data);
			});
	};

	const getRestaurantItems = () => {
		setNewItemState(props.searchedRestaurant);
	};

	React.useEffect(() => getRestaurantItems(), []);

	const updateRestaurantList = () => {
		fetch(url + "restaurants/" + props.match.params.id)
			.then((response) => response.json())
			.then((data) => {
				setNewItemState([data.restaurants]);
			});
	};

	//handleCreate function for creating new items
	const handleCreate = (newItem) => {
		let payload = { newItem, restId: props.match.params.id };

		fetch(url + "items", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		}).then(() => {
			updateRestaurantList();
		});
	};

	//handleUpdate function for updating items
	const handleUpdate = (newItem) => {
		fetch(url + "items/" + newItem._id, {
			method: "put",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newItem),
		}).then(() => {
			updateRestaurantList();
		});
	};

	// deleteItemto delete an item
	const deleteItem = (resItems) => {
		fetch(url + "items/" + resItems._id, {
			method: "delete",
		}).then(() => {
			updateRestaurantList();
		});
	};

	//return updateRestaurantList();
	if (!resItems) {
		return <p>Loading...</p>;
	}

	const selectItem = (item) => {
		setSelectedItem(item);
	};

	// Adding the Restuarant Name to top of page
	let rName = props.searchedRestaurant;
	let restaurantName = "loading...";
	if (props.searchedRestaurant[0]) {
		restaurantName = rName.map((restaurant) => {
			return (
				<div>
					<p className="RestHeader">Top Reviewed Items At:</p>
					<p className="RestName">{restaurant.name}</p>
					{/* <p>Zipcode: {restaurant.zipcode}</p>
						<img src={restaurant.img} /> */}
				</div>
			);
		});
	}

	return (
		<>
			<h2>This is the ItemList Component</h2>
			{restaurantName}
			{/* {itemsToDisplay} */}
			<Link to={props.match.url + "/add"}>
				<button className="BiggerItemBut">Add an Item</button>
			</Link>

			<Switch>
				<Route
					exact
					path={props.match.url + "/add"}
					render={(routerprops) => (
						<ItemForm
							{...routerprops}
							handleSubmit={handleCreate}
							item={form}
							id={props.match.params.id}
						/>
					)}
				/>

				<Route
					exact
					path={props.match.url}
					render={(routerprops) => (
						<Item
							{...routerprops}
							newItemState={newItemState}
							selectItem={selectItem}
							deleteItem={deleteItem}
						/>
					)}
				/>

				<Route
					exact
					path={props.match.url + "/edit"}
					render={(routerprops) => (
						<ItemForm
							{...routerprops}
							handleSubmit={handleUpdate}
							item={selectedItem}
							id={props.match.params.id}
						/>
					)}
				/>
			</Switch>
		</>
	);
}
export default ItemList;
