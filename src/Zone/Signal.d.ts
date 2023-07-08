interface Signal<T extends Callback = Callback> {
	Connect(handler: T): RBXScriptConnection;
	Destroy(): void;
	DisconnectAll(): void;
	Fire(...args: Parameters<T>): void;
	Wait(): LuaTuple<Parameters<T>>;
}

export = Signal;
