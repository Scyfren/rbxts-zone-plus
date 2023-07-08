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
	findPart(part: BasePart): LuaTuple<[boolean, BasePart[]]>;
	findItem(characterOrBasePart: BasePart | Model): LuaTuple<[boolean, BasePart[]]>;
	findPoint(point: Vector3 | CFrame): LuaTuple<[boolean, BasePart[]]>;
	getPlayers(): Player[];
	getParts(): BasePart[];
	getItems(): Array<BasePart | Model>;
	/**
	 * Generates random points within the zones region until one falls within its bounds.
	 * It then returns this Vector3 and a table array of group parts the point falls within.
	 */
	getRandomPoint(): LuaTuple<[Vector3, BasePart[]]>;
	/**
	 * This is used to detect your own custom instances within zones, such as NPCs, and is a recommended replacement for part-events/methods.
	 * An item can be any BasePart or Character/NPC (i.e. a model with a Humanoid and HumanoidRootPart). Once tracked, it can be listened for with the zone.itemEntered and zone.itemExited events.
	 * An item will be automatically untracked if destroyed or has its parent set to nil.
	 * @param item
	 */
	trackItem(characterOrBasePart: BasePart | Model): void;
	untrackItem(characterOrBasePart: BasePart | Model): void;
	/**
	 * This is used to bind the zone to a settingsGroup to enhance the default behaviour of a collection of zones. The properties of a settingsGroup can be viewed at and customised using ZoneController.setGroup.
	 * This method is particularly useful for zones where you want to guarantee the player/item is not in two zones at once. For example, when working with ambient/music/lighting zones which perfectly border each other.
	 */
	bindToGroup(settingsGroupName: string): void;
	unbindFromGroup(): void;
	/**
	 * Sets the precision of checks based upon the [Detection Enum]. Defaults to `Automatic`.
	 */
	setDetection(enumIdOrName: Detection[keyof Detection] | keyof Detection): void;
	/**
	 * Moves the zone outside of workspace into a separate WorldModel within ReplicatedStorage or ServerStorage. This action is irreversible - once called it cannot be undone.
	 */
	relocate(): void;
	/**
	 * Tracks the item until it has entered the zone, then calls the given function. If the item is already within the zone, the given function is called right away.
	 * ```lua
	 * local item = character:FindFirstChild("HumanoidRootPart")
	 * zone:onItemEnter(item, function()
	 *     print("The item has entered the zone!"))
	 * end)
	 * ```
	 */
	onItemEnter(characterOrBasePart: Model | BasePart, callback: () => void): void;
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
	itemEntered: Signal<(item: BasePart | Model) => void>;
	itemExited: Signal<(item: BasePart | Model) => void>;

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
	readonly zoneParts: BasePart[];
	readonly region: Region3;
	readonly volume: number;
	readonly worldModel: WorldModel;
}

interface ZoneConstructor {
	/**
	 * A container is used the define the boundaries of the zone. It can be any non-basepart instance (such as a Model, Folder, etc) that contain descendant baseparts. Alternatively a container can be a singular basepart instance, or a table containing an array of baseparts.
	 * @param container A model, folder, basepart or array of baseparts.
	 */
	new (container: Model | Folder | BasePart | Array<BasePart>): Zone;
	/**
	 * Constructs a zone from the given CFrame and Size. Underneath the hood, it's creating a part (or multiple parts if any size coordinage exceeds 2024), parenting this to a folder (the container), constructing a zone with this container, calling :relocate() on that zone (which parents it outside of workspace), then finally returning the zone.
	 */
	fromRegion: (cframe: CFrame, size: number) => Zone;
}

declare const Zone: ZoneConstructor;
export = Zone;
