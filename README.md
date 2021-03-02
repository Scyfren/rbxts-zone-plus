# Typings for ForeverHD's ZonePlus
https://1foreverhd.github.io/ZonePlus/

## Example:
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

## TODO:
- Create typings for Accuracy custom enum for zone.accuracy and zone.setAccuracy(accuracy)