import Signal from "Zone/Signal";

interface Tracker {
	trackers: never;
	itemAdded: Signal<(item: BasePart | Model) => void>;
	itemRemoved: Signal<(item: BasePart | Model) => void>;
	bodyPartsToIgnore: {
		UpperTorso: boolean;
		LowerTorso: boolean;
		Torso: boolean;
		LeftHand: boolean;
		RightHand: boolean;
		LeftFoot: boolean;
		RightFoot: boolean;
	};

	name: "player" | "item";
	totalVolume: number;
	parts: Array<BasePart>;
	partToItem: Map<BasePart, BasePart | Model>;
	items: Array<BasePart | Model>;
	whitelistParams: OverlapParams;
	characters: Set<Model>;
	baseParts: Set<BasePart>;
	exitDetections: Map<Model | BasePart, Detection[keyof Detection]>;

	getCombinedTotalVolumes: () => number;
	getCharacterSize: (character: Model) => LuaTuple<[Vector3, CFrame]>;
}

interface TrackerConstructor {
	new (name?: "player" | "item"): Tracker;
}

declare const Tracker: TrackerConstructor;
export = Tracker;
