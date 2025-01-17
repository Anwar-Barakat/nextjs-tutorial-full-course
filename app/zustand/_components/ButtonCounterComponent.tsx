import { useCounterStore } from '@/stores/counterStore';
import React from 'react'

const ButtonCounterComponent = () => {
    const { count, increment, decrement, reset, incrementBy, decrementBy } = useCounterStore();

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
            <button onClick={() => incrementBy(5)}>Increment by 5</button>
            <button onClick={() => decrementBy(5)}>Decrement by 5</button>
        </div>
    )
}

export default ButtonCounterComponent
