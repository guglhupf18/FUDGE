///<reference types="../../../../Core/Build/FudgeCore"/>

namespace StateMachine {
  import ƒ = FudgeCore;

  type StateMachineMethod<State> = (_agent: StateMachineAgent<State>) => void;
  type StateMachineMapStateToMethod<State> = Map<State, StateMachineMethod<State>>;
  interface StateMachineMapStateToMethods<State> {
    action: StateMachineMethod<State>;
    transitions: StateMachineMapStateToMethod<State>;
  }
  export class StateMachineAgent<State> {
    public stateCurrent: State;
    public stateNext: State;
    public stateMachine: StateMachine<State>;

    public transit(_next: State): void {
      this.stateMachine.transit(this.stateCurrent, _next, this);
    }

    public act(): void {
      this.stateMachine.act(this.stateCurrent, this);
    }
  }

  export class StateMachine<State> extends Map<State, StateMachineMapStateToMethods<State>> {

    public setTransition(_current: State, _next: State, _transition: StateMachineMethod<State>): void {
      let active: StateMachineMapStateToMethods<State> = this.getStateMethods(_current);
      active.transitions.set(_next, _transition);
    }

    public setAction(_current: State, _action: StateMachineMethod<State>): void {
      let active: StateMachineMapStateToMethods<State> = this.getStateMethods(_current);
      active.action = _action;
    }

    public transitDefault(_agent: StateMachineAgent<State>): void {
      //
    }

    public actDefault(_agent: StateMachineAgent<State>): void {
      //
    }

    public transit(_current: State, _next: State, _agent: StateMachineAgent<State>): void {
      _agent.stateNext = _next;
      try {
        let active: StateMachineMapStateToMethods<State> = this.get(_current);
        let transition: StateMachineMethod<State> = active.transitions.get(_next);
        transition(_agent);
      } catch (_error) {
        console.info(_error.message);
        this.transitDefault(_agent);
      } finally {
        _agent.stateCurrent = _next;
        _agent.stateNext = undefined;
      }
    }

    public act(_current: State, _agent: StateMachineAgent<State>): void {
      try {
        let active: StateMachineMapStateToMethods<State> = this.get(_current);
        active.action(_agent);
      } catch (_error) {
        console.info(_error.message);
        this.actDefault(_agent);
      }
    }

    private getStateMethods(_current: State): StateMachineMapStateToMethods<State> {
      let active: StateMachineMapStateToMethods<State> = this.get(_current);
      if (!active) {
        active = { action: null, transitions: new Map() };
        this.set(_current, active);
      }
      return active;
    }
  }
}