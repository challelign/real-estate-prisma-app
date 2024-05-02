import React from "react";
import ContentLoader from "react-content-loader";

const Loading = (props) => (
	<ContentLoader
		speed={2}
		width={400}
		height={160}
		viewBox="0 0 400 180"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
		<rect x="100" y="17" rx="4" ry="4" width="300" height="13" />
		<rect x="100" y="40" rx="3" ry="3" width="250" height="10" />
	</ContentLoader>
);

export default Loading;
