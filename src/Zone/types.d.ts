interface EnumChild<N extends string = string, V extends number = number, P = unknown> {
	name: N;
	value: V;
	property: P;
}

type CustomEnum<Enums extends EnumChild> = {
	[N in Enums["name"]]: (Enums & { name: N })["value"];
};

type Accuracy = CustomEnum<
	EnumChild<"Low", 1, 1.0> | EnumChild<"Medium", 2, 0.5> | EnumChild<"High", 3, 0.1> | EnumChild<"Precise", 4, 0.0>
>;

type Detection = CustomEnum<EnumChild<"Automatic", 1> | EnumChild<"Centre", 2> | EnumChild<"WholeBody", 3>>;

type Container = Model | Folder | BasePart | Array<BasePart>;

type SettingsGroup = {
	/** When set to `true`, it prevents items (players, parts, etc) from entering multiple zones at once within that group. */
	onlyEnterOnceExitedAll: boolean;
};
