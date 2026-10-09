export type Track = {name: string; artist?: string; url: string; cover?: string};
export type MusicState = {index:number;status:string;playing:boolean;time:number;duration:number};
export class MusicSession extends EventTarget {
 constructor(audio: HTMLAudioElement, tracks: Track[]);
 readonly state: MusicState;
 select(index:number): Promise<void>;
 toggle(): Promise<void>;
 seek(time:number):void;
}
