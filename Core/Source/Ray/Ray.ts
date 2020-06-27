namespace FudgeCore {
  export class Ray {
    public origin: Vector3;
    public direction: Vector3;
    public length: number;

    constructor(_direction: Vector3 = Vector3.Z(-1), _origin: Vector3 = Vector3.ZERO(), _length: number = 1) {
      this.origin = _origin;
      this.direction = _direction;
      this.length = _length;
    }

    /**
     * Returns the point of intersection of this ray with a plane defined by 
     * the given point of origin and the planes normal. All values and calculations
     * must be relative to the same coordinate system, preferably the world
     */
    public intersectPlane(_origin: Vector3, _normal: Vector3): Vector3 {
      let difference: Vector3 = Vector3.DIFFERENCE(_origin, this.origin);
      let factor: number = Vector3.DOT(difference, _normal) / Vector3.DOT(this.direction, _normal);
      let intersect: Vector3 = Vector3.SUM(this.origin, Vector3.SCALE(this.direction, factor));
      return intersect;
    }

    public getDistance(_target: Vector3): Vector3 {
      let originToTarget: Vector3 = Vector3.DIFFERENCE(_target, this.origin);
      let raySection: Vector3 = Vector3.NORMALIZATION(this.direction, 1);
      let projectedLength: number = Vector3.DOT(originToTarget, raySection);
      raySection.scale(projectedLength);
      raySection.add(this.origin);
      let distance: Vector3 = Vector3.DIFFERENCE(_target, raySection);
      return distance;
    }
  }
}