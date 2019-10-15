class Stack {
  constructor () {
    this.items = [];
  }

  push (element) {
    this.items.push(element);
  }

  pop () {
    if (this.items.length === 0) 
      return "stack is empty!" 
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length-1];
  }

  isEmpty() {
    if (this.items.length === 0) {
      return true;
    } else return false;
  }
}

class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config === undefined) throw new Error("There is no config here!");
      this.initial = config.initial;
      this.states = config.states;
      this.activeState = this.initial;
      this.history = new Stack();
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (this.states.hasOwnProperty(state) === false) throw new Error("There is no such state in FSM!");
      this.history.push(this.activeState);
      this.activeState = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (typeof(this.states[this.activeState].transitions[event]) === 'undefined') throw new Error ("There is no such event in current state!");
      this.history.push(this.activeState);
      this.activeState = this.states[this.activeState].transitions[event];
    }
        

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.activeState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      let allStatesArray = Object.keys(this.states);
      let statesArray = [];
           
      allStatesArray.forEach(state => {
        for (let i in this.states[state].transitions){
        if (i === event) statesArray.push(state);
        }
        
      });
      
      return (typeof(event) === "undefined") ? allStatesArray : statesArray;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.history.isEmpty()) return false;
      this.activeState = this.history.pop();
      return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

const config = {
  initial: 'normal',
  states: {
      normal: {
          transitions: {
              study: 'busy',
          }
      },
      busy: {
          transitions: {
              get_tired: 'sleeping',
              get_hungry: 'hungry',
          }
      },
      hungry: {
          transitions: {
              eat: 'normal'
          },
      },
      sleeping: {
          transitions: {
              get_hungry: 'hungry',
              get_up: 'normal',
          },
      },
  }
};

let student = new FSM(config);


// student.trigger('study');
console.log(student.undo());
console.log(student.getState());
