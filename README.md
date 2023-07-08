# @rbxts/zone-plus
Typings for [ForeverHD's ZonePlus v3 module](https://1foreverhd.github.io/ZonePlus/)

# Installation
`npm i @rbxts/zone-plus`

# Example Usage
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