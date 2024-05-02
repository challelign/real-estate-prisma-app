import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
	const [error, setError] = useState("");
	const [query, setQuery] = useState({
		type: "buy",
		city: "",
		minPrice: 0,
		maxPrice: 1000000000000,
	});

	const switchType = (val) => {
		setQuery((prev) => ({ ...prev, type: val }));
	};

	const handleChange = (e) => {
		setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const isDisabled = query.city === "" || query.maxPrice === "";

	return (
		<div className="searchBar">
			<div className="type">
				{types.map((type) => (
					<button
						key={type}
						onClick={() => switchType(type)}
						className={query.type === type ? "active" : ""}
					>
						{type}
					</button>
				))}
			</div>
			<form>
				<input
					type="text"
					name="city"
					placeholder="City"
					onChange={handleChange}
				/>
				<input
					type="number"
					name="minPrice"
					min={0}
					max={10000000}
					onChange={handleChange}
					placeholder="Min Price"
				/>
				<input
					type="number"
					name="maxPrice"
					min={0}
					max={10000000}
					onChange={handleChange}
					placeholder="Max Price"
				/>
				{}
				<Link
					to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
				>
					<button disabled={isDisabled}>
						<img src="/search.png" alt="" />
					</button>
				</Link>
				{error && <span> {error}</span>}
			</form>
		</div>
	);
}

export default SearchBar;
