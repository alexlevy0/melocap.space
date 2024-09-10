import React from "react";

const icons = require.context("../assets/icons", true, /\.svg$/);

export type IconName =
	| "share"
	| "profile-active"
	| "profile"
	| "explore-active"
	| "explore"
	| "home-active"
	| "home";

export function Icon({
	name,
	...props
}: {
	name: IconName;
	fill: string;
	style?: any;
	width: number;
	height: number;
}) {
	const Comp = React.useMemo(() => {
		const imp = icons(`./${name}.svg`);
		if (!imp) {
			throw new Error(
				`Icon not found: ${name}. Options: ${icons
					.keys()
					.map((value) =>
						value
							.replace(/^\.\//, "")
							.replace(/\.svg$/, ""),
					)
					.join(", ")}}`,
			);
		}
		// return null
		return imp.default;
	}, [name]);

	return <Comp {...props} color={props.fill} />;
}

export function makeIcon(icon: IconName, activeIcon: IconName) {
	return (props: { size: number; color: string; focused: boolean }) => (
		<Icon
			width={props.size}
			height={props.size}
			name={props.focused ? activeIcon : icon}
			fill={props.color}
		/>
	);
}
