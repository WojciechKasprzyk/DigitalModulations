function bpsk() {
    const harmonicFrame = this.makeFrame('harmonic');
    const signalFrame = this.makeFrame('signal');
    const modulationFrame = this.makeFrame('modulation');

    console.log(harmonicFrame,signalFrame,modulationFrame)
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
        modulationFrame.data[0].x[i] = t * this.paramsSet.scale;
        modulationFrame.data[0].y[i] = harmonicFrame.data[0].y[i] * signalFrame.data[0].y[i];
    }
  }

  function qpsk() { // nie testowane
    const signalFrame = this.makeFrame('signal');
    const modulationFrame = this.makeFrame('modulation');

    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
      modulationFrame.data[0].x[i] = t * this.paramsSet.scale;

      modulationFrame.data[0].y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI + Math.PI/4 + 2 * signalFrame.data[0].y[i] * Math.PI / 4);
    }
  }

  function qam() {
    const signalFrame = this.makeFrame('signal');
    const modulationFrame = this.makeFrame('modulation');
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
        modulationFrame.data[0].x[i] = t * this.paramsSet.scale;


      }
  }