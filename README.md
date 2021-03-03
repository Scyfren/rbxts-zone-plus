# Typings for ForeverHD's ZonePlus v2
https://1foreverhd.github.io/ZonePlus/

## Example:
NOTE: This package is not published yet, `@rbxts/zone-plus` is owned by someone else and is at a much older version!
```ts
import { Zone } from "@rbxts/zone-plus";
import { CollectionService } from "@rbxts/services";

for (const zonePart of CollectionService.GetTagged("Zone")) {
	if (zonePart.IsA("BasePart")) {
		const zone = new Zone(zonePart);

		zone.playerEntered.Connect((player) => {
			print(`${player.Name} entered the zone!`);
		});

		zone.playerExited.Connect((player) => {
			print(`${player.Name} exited the zone!`);
		});
	}
}
```