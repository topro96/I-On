export enum ActionName {
  Create,
  Move,
}

export class Action {
  name: ActionName;
  elementID: string;
  payload: any;

  constructor(_name: ActionName, _id: string, payload: any) {
    this.name = _name;
    this.elementID = _id;
    this.payload = payload;
  }
}

export default class ActionManager {
  actions: Action[] = [];
  current = 0;

  public push(action: Action) {
    this.actions.push(action);
    this.current++;
  }

  public isEmpty() {
    return this.actions.length === 0;
  }

  public goBack() {
    if (this.current > 0) this.current--;
  }

  public goForward()
  {
    if(this.current < this.actions.length) this.current++;
  }

  public getCurrentAction() {
    if (this.actions.length <= 0) return null;

    return this.actions[this.current - 1];
  }

  public getNextAction() {
    if (this.current >= this.actions.length) return null;

    return this.actions[this.current];
  }

  public clear() {
    this.actions = [];
  }
}

export var actionManager = new ActionManager();
