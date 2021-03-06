/// <reference path="Component.ts"/>
namespace FudgeCore {

    /**
     * The camera component holds the projection-matrix and other data needed to render a scene from the perspective of the node it is attached to.
     * @authors Jascha Karagöl, HFU, 2019 | Jirka Dell'Oro-Friedl, HFU, 2019
     */
    export class ComponentCamera extends Component {

        public camera: Camera; // The camera used to render

        public pivot: Matrix4x4 = Matrix4x4.IDENTITY;

        public setType<T extends Camera>(_class: new () => T): void {
            this.camera = new _class();
        }
      
        //#region Transfer
        public serialize(): Serialization {
            let serialization: Serialization = {
                pivot: this.pivot.serialize(),
                camera: this.camera.serialize(),
                [super.constructor.name]: super.serialize()
            };
            return serialization;
        }

        public deserialize(_serialization: Serialization): Serializable {
            this.pivot.deserialize(_serialization.pivot);
            this.camera.deserialize(_serialization.camera);
            super.deserialize(_serialization[super.constructor.name]);

            return this;
        }

        public getMutatorAttributeTypes(_mutator: Mutator): MutatorAttributeTypes {
            let types: MutatorAttributeTypes = super.getMutatorAttributeTypes(_mutator);
            if (types.direction)
                types.direction = FIELD_OF_VIEW;
            if (types.projection)
                types.projection = PROJECTION;
            return types;
        }

        public mutate(_mutator: Mutator): void {
            super.mutate(_mutator);

            switch (this.camera.projection) {
                case PROJECTION.CENTRAL:
                    this.camera = new CameraCentral();
                    break;
            }
        }

        protected reduceMutator(_mutator: Mutator): void {
            delete _mutator.transform;
            super.reduceMutator(_mutator);
        }

        //#endregion
    }
}