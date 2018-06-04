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
        this.samplingRate = params.sampligRate ? params.sampligRate : 500;
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


export namespace Modulation {
    export namespace BPSK {
        export type IQValues = 1;
        export const bitPerSymbol = 1;
        export const maxAmplitude = Math.sqrt(2);
    }
    export namespace QPSK {
        export type IQValues = 1 | 3;
        export const bitPerSymbol = 2;
        export const maxAmplitude = Math.sqrt(3 * 3 * 2);
    }
    export namespace QAM8 {
        export type IQValues = 1 | 3;
        export const bitPerSymbol = 3;
        export const maxAmplitude = Math.sqrt(3 * 3 * 2);
    }
    export namespace QAM16 {
        export type IQValues = 1 | 3;
        export const bitPerSymbol = 4;
        export const maxAmplitude = Math.sqrt(3 * 3 * 2);
    }
    export namespace QAM64 {
        export type IQValues = 1 | 3 | 5 | 7;
        export const bitPerSymbol = 6;
        export const maxAmplitude = Math.sqrt(7 * 7 * 2);
    }
    export type ModulationType = 'BPSK' | 'QPSK' | 'QAM8' | 'QAM16' | 'QAM64';
}


export type bit = 1 | 0;