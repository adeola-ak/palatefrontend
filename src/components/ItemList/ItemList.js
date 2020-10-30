import React from "react";
import ItemForm from "../ItemForm/ItemForm";
import Item from "../Item/Item";
import { Route, Switch, Link } from "react-router-dom";
import "./ItemList.css";

function ItemList(props) {
	// const items = props.searchedRestaurant;
	// let itemsToDisplay = "Loading...";
	// if (props.searchedRestaurant[0]) {
	// 	itemsToDisplay = items.map((item) => {
	// 		return (
	// 			<div>
	// 				<p>Item name: {item.items[0].name}</p>
	// 				<p>Item type: {item.items[0].type}</p>
	// 				<img src={item.items[0].img} />
	// 				<hr />
	// 			</div>
	// 		);
	// 	});
	// }

	console.log("testing routerprops in ItemList", props.match.params);
	const id = props.match.params.id;
	console.log("testing routerprops in ItemList - exampleId", id);

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
		// fetch(url + "restaurants/")
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log("data - items", data);
		// 		setNewItemState(props.searchedRestaurant);
		// 	});
		setNewItemState(props.searchedRestaurant);
	};

	React.useEffect(() => getRestaurantItems(), []);

	const updateRestaurantList = () => {
		fetch(url + "restaurants/" + props.match.params.id)
			.then((response) => response.json())
			.then((data) => {
				console.log("data", data);
				console.log("data.restaurants", data.restaurants);
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
			//   itemId = res.json()
			//   return itemId

			//   getItems();
			updateRestaurantList();
			//   props.history.push(`/restaurant/${props.match.params.id}`)
		});
		console.log("newItemState in updateRestaurantList", newItemState);
		console.log("payload", payload);
	};

	// fetch to add item to restaurant
	// fetch(url + "restaurants/" + props.searchedRestaurant._id + "/addItem/" + newItem._id, {
	// 	method: "put",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: JSON.stringify(newItem),
	// }).then(() => {

	// 	setResItems(emptyItem);
	// 	getItems();
	// });

	// 	setResItems(emptyItem);
	// 	getItems();
	// });

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

	// if (isDeleted) {
	// 	console.log("ITEM DELETED");
	// 	return getItems();
	// }

	// // deleteItemto delete an item
	// const deleteItem = (resItems) => {
	// 	fetch(url + "items/" + resItems._id, {
	// 		method: "delete",
	// 	}).then(() => setIsDeleted(true));
	// };

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
					<p className="RestName">
						Top Reviewed Items At:<br></br> {restaurant.name}
					</p>
					{/* <p>Zipcode: {restaurant.zipcode}</p>
						<img src={restaurant.img} /> */}

					<hr />
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

			{/* exact path="/restaurant/:id/" */}
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
