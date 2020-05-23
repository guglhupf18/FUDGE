namespace Import {

  export interface ClosureStorage {
    [key: string]: Function;
  }

  export interface ParticleEffectDefinition {
    storage?: ClosureStorage;
    translation?: ClosureVector;
    rotation?: ClosureVector;
    translationWorld?: ClosureVector;
    scaling?: ClosureVector;
  }

  export interface ClosureVector {
    x?: Function;
    y?: Function;
    z?: Function;
  }

  export class ParticleEffectImporter {
    private storedValues: StoredValues;
    private randomNumbers: number[];
    private definition: ParticleEffectDefinition = {};

    constructor(_storedValues: StoredValues, _randomNumbers: number[]) {
      this.storedValues = _storedValues;
      this.randomNumbers = _randomNumbers;
    }

    public importFile(_filename: string): void {
      //TODO: import file
    }

    /**
     * Parse the data from json file and return a particle effect definition
     * @param _data the data to parse
     * @returns a definition of the particle effect containing the closure for translation, rotation etc.
     */
    public parseFile(_data: ParticleEffectData): ParticleEffectDefinition {

      // pre parse storage and initialize stored values
      for (const key in _data.storage) {
        if (key in this.storedValues) {
          f.Debug.error("Predefined variables can not be overwritten");
          return null;
        }
        else
          this.storedValues[key] = 0;
      }

      // parse storage
      this.definition.storage = {};
      for (const key in _data.storage) {
        this.definition.storage[key] = this.parseClosure(_data.storage[key]);
      }

      // parse translation locale
      this.definition.translation = this.parseVectorData(_data.translation);

      // parse rotation
      this.definition.rotation = this.parseVectorData(_data.rotation);

      // parse translation world
      this.definition.translationWorld = this.parseVectorData(_data.translationWorld);

      // parse scaling
      this.definition.scaling = this.parseVectorData(_data.scaling);

      return this.definition;
    }

    /**
     * Parse the given paticle vector. If _data is undefined return a closure vector which functions return 0.
     * @param _data the paticle vector data to parse
     */
    private parseVectorData(_data: ParticleVectorData): ClosureVector {
      if (!_data) {
        _data = {};
      }
      let closureVector: ClosureVector = {};
      closureVector.x = this.parseClosure(_data.x);
      closureVector.y = this.parseClosure(_data.y);
      closureVector.z = this.parseClosure(_data.z);
      return closureVector;
    }

    /**
     * Parse the given closure data recursivley. If _data is undefined return a function which returns 0.
     * @param _data the closure data to parse recursively
     */
    private parseClosure(_data: ClosureData): Function {
      // TODO: Refactor handling of undefined vlaues
      if (!_data) {
        return function (): number {
          return null;
        };
      }

      switch (typeof _data) {
        case "object":
          let parameters: Function[] = [];
          for (let param of _data.parameters) {
            parameters.push(this.parseClosure(param));
          }

          // random closure needs to have the random numbers array as a parameter
          if (_data.function == "random") {
            parameters.push(() => {
              return this.randomNumbers;
            });
          }

          let closure: Function = ClosureFactory.getClosure(_data.function, parameters);

          // pre evaluate closure so that only the result will be saved
          if (_data.preEvaluate) {
            f.Debug.log("PreEvaluate");
            let result: number = closure();
            closure = () => {
              f.Debug.log("preEvaluated", result);
              return result;
            };
          }
          return closure;

        case "string":
          if (_data in this.storedValues) {
            return () => {
              f.Debug.log("Variable", `"${_data}"`, this.storedValues[<string>_data]);
              return this.storedValues[<string>_data];
            };
          }
          else {
            f.Debug.error(`"${_data}" is not defined`);
            return null;
          }

        case "number":
          return function (): number {
            f.Debug.log("Constant", _data);
            return <number>_data;
          };
      }
    }
  }
}