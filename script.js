// ****** Redux Related Work ****** //

// initial state
const initialState = {
    counters: [
        {
            id: 1,
            value: 0
        }
    ]
};

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADDCOUNTER = "ADDCOUNTER";
const RESET = "RESET";

// action creators
const increment = (id, value) => {
    return {
        type: INCREMENT,
        payload: {
            id,
            value
        }
    };
};

const decrement = (id, value) => {
    return {
        type: DECREMENT,
        payload: {
            id,
            value
        }
    };
};

const addCounter = (id) => {
    return {
        type: ADDCOUNTER,
        payload: {
            id
        }
    };
};

const reset = () => {
    return {
        type: RESET,
    };
};

// reducer
const reducer = (state = initialState, action) => {
    if(action.type === INCREMENT) {
        const updatedState = {
            ...state,
            counters: [
                ...state.counters
            ]
        };

        const targetCounter = updatedState.counters.find(counter => counter.id === action.payload.id);
        targetCounter.value = targetCounter.value + action.payload.value;
        return updatedState;
    }

    else if(action.type === DECREMENT) { 
        const updatedState = {
            ...state,
            counters: [
                ...state.counters
            ]
        };
    
        const targetCounter = updatedState.counters.find(counter => counter.id === action.payload.id);
        targetCounter.value = targetCounter.value - action.payload.value;
        return updatedState;
    }

    else if(action.type === ADDCOUNTER) { 
        const updatedState = {
            ...state,
            counters: [
                ...state.counters,
                {
                    id: action.payload.id,
                    value: 0
                }
            ]
        };
    
        return updatedState;
    }

    else if(action.type === RESET) {
        const updatedState = {
            ...state,
            counters: [
                ...state.counters
            ]
        };
        
        updatedState.counters.forEach(counter => counter.value = 0);
        return updatedState;

        // return {
        //     counters: [
        //         {
        //             id: 1,
        //             value: 0
        //         }
        //     ]
        // };
    }

    else {
        return state;
    };
};

// store
const store = Redux.createStore(reducer);


// ****** UI related work ****** //

// get UI element
const addCounterBtn = document.getElementById("add-counter-btn");
const resetBtn = document.getElementById("reset-btn");
const layout = document.getElementById("layout");
const addCountersContainer = document.getElementById("add-counters-container");

// add event listener
addCounterBtn.addEventListener("click", () => {
    const id = Math.random() * Math.random();
    store.dispatch(addCounter(id));
    createCounterUI(id);
});

resetBtn.addEventListener("click", () => {
    store.dispatch(reset());
    updateAllCounterUI();
});

// create counter UI
const createCounterUI = (id) => {
    const div = document.createElement("div");
    div.className = "max-w-md mx-auto mt-10 space-y-5";

    div.innerHTML = `
        <div
            class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
        >
            <div class="text-2xl font-semibold" id="value-${id}">0</div>
            <div class="flex space-x-3">
                <button
                    class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                    id="increment-btn-${id}"
                >
                    Increment
                </button>
                <button
                    class="bg-red-400 text-white px-3 py-2 rounded shadow"
                    id="decrement-btn-${id}"
                >
                    Decrement
                </button>
            </div>
        </div>`;

    layout.insertBefore(div, addCountersContainer);

    const generateRandomValue = Math.round(Math.random() * 10) + 1;
    addClickEvent(id, generateRandomValue);
};

// update counter UI
const updateSingleCounterUI = (id) => {
    const currentState = store.getState();
    const allCounters = currentState.counters;
    const currentCounters = allCounters.find(counter => counter.id === id);
    const value = document.getElementById(`value-${id}`);
    value.innerHTML = currentCounters.value;
};

const updateAllCounterUI = () => {
    const currentState = store.getState();
    const allCounters = currentState.counters;
    allCounters.forEach(counter => {
        updateSingleCounterUI(counter.id);
    });
};

// add click event listener to counter button
const addClickEvent = (id, value) => {
    const incrementBtn = document.getElementById(`increment-btn-${id}`);
    const decrementBtn = document.getElementById(`decrement-btn-${id}`);

    incrementBtn.addEventListener("click", () => {
        store.dispatch(increment(id, value));
        updateSingleCounterUI(id);
    });

    decrementBtn.addEventListener("click", () => {
        store.dispatch(decrement(id, value));
        updateSingleCounterUI(id);
    });
};

// initially add event listener to first counter
addClickEvent(1, 1);

