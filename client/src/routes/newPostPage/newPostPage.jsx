import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
const styleError = {
	// fontSize: 14,
	color: "#b91919",
	// textAlign: "center",
	// paddingTop: "100px",
};
const schemaPost = yup
	.object({
		title: yup.string().required("Missing Title"),
		address: yup.string().required("Missing Address"),
		city: yup.string().required("Missing City"),

		latitude: yup.string().required("Missing Latitude"),
		longitude: yup.string().required("Missing Longitude"),
		bedroom: yup
			.number()
			.typeError("Bedroom must be a number")
			.required("Missing Bedroom")
			.positive()
			.integer(),
		bathroom: yup
			.number()
			.typeError("Bathroom must be a number")
			.required("Missing Bathroom")
			.positive()
			.integer(),
		price: yup
			.number()
			.typeError("Price must be a number")
			.required("Missing Price")
			.integer()
			.positive(),

		desc: yup.string().required("Missing Description"),
		pet: yup.string().required("Missing  Pet"),
		income: yup.string().required("Missing Income"),
		size: yup
			.number()
			.typeError("Size must be a number")
			.required("Missing Size")
			.positive()
			.integer(),
		school: yup
			.number()
			.typeError("School must be a number")
			.required("Missing School")
			.integer()
			.positive(),

		bus: yup
			.number()
			.typeError("Bus must be a number")
			.required("Missing Bus")
			.positive()
			.integer(),
		restaurant: yup
			.number()
			.typeError("Restaurant must be a number")
			.required("Missing Restaurant")
			.positive()
			.integer(),
		type: yup.string().required("Missing type"),
		utilities: yup.string().required("Missing Utilities"),
	})
	.required();
function NewPostPage() {
	const [error, setError] = useState("");
	const [imagesPost, setImagesPost] = useState([]);
	const navigate = useNavigate();

	const [cloudName] = useState("melodie");
	const [uploadPreset] = useState("chaestate");
	const [folder] = useState("posts");
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schemaPost), defaultValues: {} });
	const [uwConfig] = useState({
		cloudName,
		uploadPreset,
		folder,
		multiple: true, //restrict upload to a single file
		maxImageFileSize: 5000000, //restrict file size to less than 5MB
	});
	const handleQuillChange = (value) => {
		setValue("desc", value, true); // Trigger validation
	};
	console.log("================>data===========>");

	const onSubmit = async (data) => {
		console.log("================>data===========>", data);

		if (
			imagesPost.length === 0 ||
			imagesPost === "" ||
			imagesPost.length === null
		) {
			return setError("Please upload image");
		}
		try {
			const res = await apiRequest.post("/posts", {
				postData: {
					title: data.title,
					price: parseInt(data.price),
					address: data.address,
					city: data.city,
					bedroom: parseInt(data.bedroom),
					bathroom: parseInt(data.bathroom),
					type: data.type,
					property: data.property,
					latitude: data.latitude,
					longitude: data.longitude,
					imagesPost: imagesPost,
				},
				postDetail: {
					desc: data.desc,
					utilities: data.utilities,
					pet: data.pet,
					income: data.income,
					size: parseInt(data.size),
					school: parseInt(data.school),
					bus: parseInt(data.bus),
					restaurant: parseInt(data.restaurant),
				},
			});
			console.log(res);
			navigate("/" + res.data.newPost.id);
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};

	return (
		<div className="newPostPage">
			<div className="formContainer">
				<h1>Add New Post</h1>
				<div className="wrapper">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="item">
							<label htmlFor="title">Title</label>
							<input
								id="title"
								{...register("title")}
								name="title"
								type="text"
							/>
							{errors.title?.message && (
								<p style={styleError}>{errors.title?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="price">Price</label>

							<input
								id="price"
								name="price"
								type="number"
								{...register("price")}
							/>

							{errors.price?.message && (
								<p style={styleError}>{errors.price?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="address">Address</label>
							<input
								id="address"
								name="address"
								type="text"
								{...register("address")}
							/>

							{errors.address?.message && (
								<p style={styleError}>{errors.address?.message}</p>
							)}
						</div>
						<div className="item description">
							<label htmlFor="desc">Description</label>
							<ReactQuill
								theme="snow"
								{...register("desc")}
								onChange={handleQuillChange}
							/>
							{errors.desc && <p style={styleError}>{errors.desc?.message}</p>}
						</div>
						<div className="item">
							<label htmlFor="city">City</label>
							<input id="city" name="city" type="text" {...register("city")} />

							{errors.city?.message && (
								<p style={styleError}>{errors.city?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="bedroom">Bedroom Number</label>
							<input
								min={1}
								id="bedroom"
								name="bedroom"
								type="number"
								{...register("bedroom")}
							/>

							{errors.bedroom?.message && (
								<p style={styleError}>{errors.bedroom?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="bathroom">Bathroom Number</label>
							<input
								min={1}
								id="bathroom"
								name="bathroom"
								type="number"
								{...register("bathroom")}
							/>

							{errors.bathroom?.message && (
								<p style={styleError}>{errors.bathroom?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="latitude">Latitude</label>
							<input
								id="latitude"
								name="latitude"
								type="text"
								{...register("latitude")}
							/>

							{errors.latitude?.message && (
								<p style={styleError}>{errors.latitude?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="longitude">Longitude</label>
							<input
								id="longitude"
								name="longitude"
								type="text"
								{...register("longitude")}
							/>

							{errors.longitude?.message && (
								<p style={styleError}>{errors.longitude?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="type">Type</label>
							{/* <select name="type">
								<option value="rent" defaultChecked>
									Rent
								</option>
								<option value="buy">Buy</option>
							</select> */}
							<select name="type" {...register("type")}>
								<option value="rent" defaultChecked>
									Rent
								</option>
								<option value="buy">Buy</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="type">Property</label>
							{/* <select name="property">
								<option value="apartment">Apartment</option>
								<option value="house">House</option>
								<option value="condo">Condo</option>
								<option value="land">Land</option>
							</select> */}
							<select name="property" {...register("property")}>
								<option value="apartment" defaultChecked>
									Apartment
								</option>
								<option value="house">House</option>
								<option value="condo">Condo</option>
								<option value="land">Land</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="utilities">Utilities Policy</label>
							{/* <select name="utilities">
								<option value="owner">Owner is responsible</option>
								<option value="tenant">Tenant is responsible</option>
								<option value="shared">Shared</option>
							</select> */}

							<select name="utilities" {...register("utilities")}>
								<option value="owner" defaultChecked>
									Owner is responsible
								</option>
								<option value="tenant">Tenant is responsible</option>
								<option value="shared">Shared</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="pet">Pet Policy</label>
							{/* <select name="pet">
								<option value="allowed">Allowed</option>
								<option value="not-allowed">Not Allowed</option>
							</select> */}

							<select name="pet" {...register("pet")}>
								<option value="allowed" defaultChecked>
									Allowed
								</option>
								<option value="not-allowed">Not Allowed</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="income">Income Policy</label>
							<input
								id="income"
								name="income"
								type="text"
								placeholder="Income Policy"
								{...register("income")}
							/>

							{errors.income?.message && (
								<p style={styleError}>{errors.income?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="size">Total Size (sqft)</label>
							<input
								min={0}
								id="size"
								name="size"
								type="number"
								{...register("size")}
							/>

							{errors.size?.message && (
								<p style={styleError}>{errors.size?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="school">School</label>
							<input
								min={0}
								id="school"
								name="school"
								type="number"
								{...register("school")}
							/>

							{errors.school?.message && (
								<p style={styleError}>{errors.school?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="bus">bus</label>
							<input
								min={0}
								id="bus"
								name="bus"
								type="number"
								{...register("bus")}
							/>

							{errors.bus?.message && (
								<p style={styleError}>{errors.bus?.message}</p>
							)}
						</div>
						<div className="item">
							<label htmlFor="restaurant">Restaurant</label>
							<input
								min={0}
								id="restaurant"
								name="restaurant"
								type="number"
								{...register("restaurant")}
							/>

							{errors.restaurant?.message && (
								<p style={styleError}>{errors.restaurant?.message}</p>
							)}
						</div>
						{error && (
							<span>
								<p style={styleError}>{error.code}</p>
								<p style={styleError}>{error.message} </p>
							</span>
						)}

						<button className="sendButton">Add</button>
					</form>
				</div>
			</div>
			<div className="sideContainer">
				{imagesPost.map((image, index) => (
					<img
						src={image}
						key={index}
						alt="Image"
						// {...register("imagesPost")}
					/>
				))}
				<UploadWidget uwConfig={uwConfig} setState={setImagesPost} />
				{error && (
					<span>
						<p style={styleError}>{error}</p>
					</span>
				)}
			</div>
		</div>
	);
}

export default NewPostPage;
