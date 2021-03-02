import RotatedRegion3 from "@rbxts/rotatedregion3";
import Zone from "./index";

interface ZoneController {
	getZones(): Zone[];
	/**
	 * @returns charRegion, regionCFrame, charSize
	 */
	getCharacterRegion(player: Player): [RotatedRegion3, CFrame, Vector3] | undefined;
	getTouchingZones(player: Player): Zone[];
	/**
	 * @returns height, minY, maxY
	 */
	getHeightOfParts(parts: BasePart[]): [number, number, number]; // might error when parts is an empty array!
	vectorIsBetweenYBounds(vectorToCheck: Vector3, parts: BasePart[]): boolean;
	verifyTouchingParts(vectorsToCheck: Vector3[], parts: BasePart[]): boolean;
}

declare const ZoneController: ZoneController;
export = ZoneController;
