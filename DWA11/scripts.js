// Define action types
const ActionTypes = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT',
    RESET: 'RESET',
  };
  
  // Define the reducer function
  function reducer(state = { count: 0 }, action) {
    switch (action.type) {
      case ActionTypes.ADD:
        return { count: state.count + 1 };
      case ActionTypes.SUBTRACT:
        return { count: state.count - 1 };
      case ActionTypes.RESET:
        return { count: 0 };
      default:
        return state;
    }
  }
  
  // Define the store
  function createStore(reducer) {
    let state = reducer(undefined, {}); // Initialize the state
    let listeners = [];
  
    // Get the current state
    function getState() {
      return state;
    }
  
    // Dispatch an action to update the state
    function dispatch(action) {
      state = reducer(state, action);
      // Notify all the listeners
      listeners.forEach(listener => listener());
    }
  
    // Subscribe to state changes
    function subscribe(listener) {
      listeners.push(listener);
      // Return an unsubscribe function
      return function unsubscribe() {
        listeners = listeners.filter(l => l !== listener);
      };
    }
  
    return {
      getState,
      dispatch,
      subscribe,
    };
  }
  
  // Create the store
  const store = createStore(reducer);
  
  // Test scenarios
  console.log('Scenario: Increment the counter by one');
  console.log('GIVEN no interactions have been performed yet');
  console.log('WHEN the "getState" method is run');
  console.log('AND the result is logged to the console');
  console.log('AND the browser console is open');
  console.log('THEN the state should show a count of 0');
  
  store.subscribe(() => console.log('Current count:', store.getState().count));
  store.dispatch({ type: ActionTypes.ADD });
  
  console.log('Scenario: Increment the counter by one');
  console.log('GIVEN no interactions have been performed yet');
  console.log('WHEN an "ADD" action is dispatched');
  console.log('AND another "ADD" action is dispatched');
  console.log('AND the browser console is open');
  console.log('THEN the state should show a count of 2');
  
  store.dispatch({ type: ActionTypes.ADD });
  store.dispatch({ type: ActionTypes.ADD });
  
  console.log('Scenario: Increment the counter by one');
  console.log('GIVEN the current count in the state is 2');
  console.log('WHEN a "SUBTRACT" action is dispatched');
  console.log('AND the browser console is open');
  console.log('THEN the state should display a count of 1');
  
  store.dispatch({ type: ActionTypes.SUBTRACT });
  
  console.log('Scenario: Resetting the Tally Counter');
  console.log('GIVEN the current count in the state is 1');
  console.log('WHEN a "RESET" action is dispatched');
  console.log('AND the browser console is open');
  console.log('THEN the state should display a count of 0');
  
  store.dispatch({ type: ActionTypes.RESET });
  