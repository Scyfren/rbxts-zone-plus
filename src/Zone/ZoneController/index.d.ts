import Zone from "Zone";

type SettingsGroup = {
	/** When set to `true`, it prevents items (players, parts, etc) from entering multiple zones at once within that group. */
	onlyEnterOnceExitedAll: boolean;
};

interface ZoneController {
	getZones: () => Zone[];

	getTouchingZones: (player: Player) => LuaTuple<[Zone[], Zone[]]>;
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
	setGroup: (settingsGroupName: string, properties: SettingsGroup) => void;
	getGroup: (settingsGroupName: string) => SettingsGroup;
}

declare const ZoneController: ZoneController;
export = ZoneController;
