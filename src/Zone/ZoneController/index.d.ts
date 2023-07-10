import Zone from "Zone";
import Tracker from "./tracker";

interface ZoneController {
	getZones: () => Zone[];

	getTouchingZones: (
		item: BasePart | Model,
		onlyActiveZones?: boolean,
		recommendedDetection?: Detection,
		tracker?: Tracker,
	) => LuaTuple<[Zone[], Map<BasePart, Zone>]>;
	/**
	 * properties is a dictionary defining the groups settings. The default properties are:
	 * ```lua
	 * {
	 *     onlyEnterOnceExitedAll = true, -- When set to `true`, it prevents items (players, parts, etc) from entering multiple zones at once within that group.
	 * }
	 * ```
	 *
	 * A zone can be bound to a group using zone:bindToGroup.
	 */
	setGroup: (settingsGroupName: string, properties?: SettingsGroup) => SettingsGroup;
	getGroup: (settingsGroupName: string) => SettingsGroup;
	getWorkspaceContainer: () => Container;
}

declare const ZoneController: ZoneController;
export = ZoneController;
