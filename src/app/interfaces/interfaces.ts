export class ParamsSet {
    name: string;
    bits: bit[];
    samplingRate: number;
    scale: number;
    signalFrequency: number;
    private _frequency;
    set frequency(f: number) {
        this._frequency = f * 2;
    }
    get frequency() {
        return this._frequency;
    }

    private _periods: number;
    set periods(p: number) {
        this._periods = p * 2;
    }
    get periods() {
        return this._periods;
    }

    constructor(params: Params) {
        this.bits = params.bits;
        this.frequency = params.frequency;
        this.signalFrequency = params.signalFrequency;
        this.samplingRate = params.sampligRate ? params.sampligRate : 1400;
        this.scale = params.scale ? params.scale : 1;
    }
}


interface Params {
    name: string;
    bits: bit[];
    frequency: number;
    signalFrequency: number;
    sampligRate?: number;
    scale?: number;
}

export class Frame {
    name: string;
    x: number[];
    y: number[];
}

export class Plot /* PlotlyFrame */ {
    name: string;
    data: Array<{ x?: number[], y: number[] }>;
}


export type bit = 1 | 0;