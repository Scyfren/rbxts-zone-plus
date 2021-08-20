import Signal from "./Signal";

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

interface Zone {
	// Methods
	findLocalPlayer(): boolean;
	findPlayer(player: Player): boolean;
	findPart(part: BasePart): boolean;
	getPlayers(): Player[];
	getParts(): BasePart[];
	/**
	 * Generates random points within the zones region until one falls within its bounds.
	 * It then returns this Vector3 and a table array of group parts the point falls within.
	 */
	getRandomPoint(): [Vector3, BasePart[]];
	/**
	 * Sets the frequency of checks based upon the Accuracy Enum.
	 */
	setAccuracy(enumIdOrName: Accuracy[keyof Accuracy] | keyof Accuracy): void;
	/**
	 * Sets the precision of checks based upon the [Detection Enum]. Defaults to 'Automatic'.
	 */
	setDetection(enumIdOrName: Detection[keyof Detection] | keyof Detection): void;
	/**
	 * Disconnects all connections within the zone.
	 */
	destroy(): void;

	// Events
	localPlayerEntered: Signal<() => void>;
	localPlayerExited: Signal<() => void>;
	playerEntered: Signal<(player: Player) => void>;
	playerExited: Signal<(player: Player) => void>;
	partEntered: Signal<(part: BasePart) => void>;
	partExited: Signal<(part: BasePart) => void>;

	// Properties
	/**
	 * To change accuracy it's recommended you use setAccuracy.
	 */
	readonly accuracy: Accuracy[keyof Accuracy];
	/**
	 * To change both detection types use [setDetection] otherwise to set individually do:
	 */
	enterDetection: Detection[keyof Detection];
	/**
	 * To change both detection types use [setDetection] otherwise to set individually do:
	 */
	exitDetection: Detection[keyof Detection];
	/**
	 * When true, the zone will update when its group parts change size or position, or when a descendant group part is added or removed from the group.
	 */
	autoUpdate: boolean;
	/**
	 * When true, will prevent the internal _update() from being called multiple times within a 0.1 second period.
	 */
	respectUpdateQueue: boolean;
	/**
	 * An array of baseparts, defined in the group constructor parameter, that form the zone.
	 */
	readonly groupParts: BasePart[];
	readonly region: Region3;
	readonly volume: number;
}

interface ZoneConstructor {
	/**
	 *
	 * @param basePart A BasePart that defines the boundary of the zone
	 */
	new (part: BasePart): Zone;
	/**
	 *
	 * @param baseParts An array of BaseParts that define the boundaries of the zone
	 */
	new (parts: BasePart[]): Zone;
	/**
	 *
	 * @param withPartDescendants An instance with possible BasePart descendants that define the boundaries of the zone
	 */
	new (withPartDescendants: Instance): Zone;
}

declare const Zone: ZoneConstructor;
export = Zone;
