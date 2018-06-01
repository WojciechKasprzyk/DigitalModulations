export class ParamsSet {
    name: string;
    bits: bit[];
    samplingRate: number;
    scale: number;
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
        this.periods = params.periods;
        this.samplingRate = params.sampligRate ? params.sampligRate : 1400;
        this.scale = params.scale ? params.scale : 1;
    }
}


interface Params {
    name: string;
    bits: bit[];
    frequency: number;
    periods: number;
    sampligRate?: number;
    scale?: number;
}

export class Frame {
    name: string;
    data: Array<{ x?: number[], y: number[] }>;
}


type bit = 1 | 0;