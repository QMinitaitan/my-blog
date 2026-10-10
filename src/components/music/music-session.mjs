export class MusicSession extends EventTarget {
	constructor(audio, tracks) {
		super();
		this.audio = audio;
		this.tracks = tracks;
		this.index = 0;
		this.status = "idle";
		this.generation = 0;
		for (const event of [
			"playing",
			"pause",
			"ended",
			"timeupdate",
			"loadedmetadata",
			"durationchange",
			"waiting",
			"error",
		]) {
			audio.addEventListener(event, () => {
				if (!this.tracks[this.index]?.url) return;
				if (event === "error") this.status = "error";
				else if (event === "waiting") this.status = "loading";
				else if (event === "playing") this.status = "playing";
				else if (event === "pause" || event === "ended") this.status = "paused";
				this.notify();
			});
		}
	}
	get state() {
		return {
			index: this.index,
			status: this.status,
			playing: this.status === "playing" && !this.audio.paused,
			time: this.audio.currentTime || 0,
			duration: Number.isFinite(this.audio.duration) ? this.audio.duration : 0,
		};
	}
	notify() {
		this.dispatchEvent(new Event("change"));
	}
	async select(index) {
		if (!this.tracks[index]) return;
		if (index !== this.index || !this.audio.src) {
			this.generation++;
			this.audio.pause();
			this.index = index;
			if (this.tracks[index].url) this.audio.src = this.tracks[index].url;
			else this.audio.removeAttribute?.("src");
			this.audio.load();
			this.audio.currentTime = 0;
		}
		await this.play();
	}
	async play() {
		if (!this.tracks[this.index]?.url) {
			this.status = "missing";
			this.notify();
			return;
		}
		if (!this.audio.src) {
			this.audio.src = this.tracks[this.index].url;
			this.audio.load();
		}
		const generation = this.generation;
		this.status = "loading";
		this.notify();
		try {
			await this.audio.play();
		} catch {
			if (generation === this.generation) {
				this.status = "error";
				this.notify();
			}
		}
	}
	async toggle() {
		if (!this.audio.paused || this.status === "loading") {
			this.generation++;
			this.audio.pause();
			this.status = "paused";
			this.notify();
		} else await this.play();
	}
	seek(time) {
		if (this.state.duration > 0) {
			this.audio.currentTime = Math.min(this.state.duration, Math.max(0, time));
			this.notify();
		}
	}
}
