import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../../components/LoadingSkeleton/Loading";

function ListPage() {
	// const data = listData;
	const posts = useLoaderData();

	console.log(posts);

	return (
		<div className="listPage">
			<div className="listContainer">
				<div className="wrapper">
					<Filter />
					<Suspense
						fallback={
							<>
								<h3>Loading Posts ... It wont be long</h3>
								<Loading />
							</>
						}
					>
						<Await
							resolve={posts.postResponse}
							errorElement={<p>Error loading posts!</p>}
						>
							{(postResponse) =>
								postResponse.data.map((item) => (
									<>
										{console.log(JSON.stringify(item))}
										<Card key={item?.id} item={item} />
									</>
								))
							}
						</Await>
					</Suspense>
				</div>
			</div>
			<div className="mapContainer">
				<Suspense
					fallback={
						<>
							<h3>Loading maps ... It wont be long</h3>
							<Loading />
						</>
					}
				>
					<Await
						resolve={posts.postResponse}
						errorElement={<p>Error loading posts!</p>}
					>
						{(postResponse) => <Map items={postResponse.data} />}
					</Await>
				</Suspense>
			</div>
		</div>
	);
}

export default ListPage;
