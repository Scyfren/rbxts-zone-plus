interface Signal<T extends Callback = Callback> {
	Fire(...args: Parameters<T>): void;
	Connect(handler: T): RBXScriptConnection;
	Wait(): LuaTuple<Parameters<T>>;
	Destroy(): void;
	Disconnect(): void;
}

export = Signal;
