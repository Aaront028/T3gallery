'use client';

import useCounterStore from '../../utils/ImageStore';

export default function HelloPage() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div>
      <h1>Hello Next.js!</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
