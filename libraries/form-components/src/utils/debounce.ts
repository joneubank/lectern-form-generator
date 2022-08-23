type DebouncedFunction<Input> = {
  (input: Input): void;
  now: (input: Input) => void; // Execute the method immediately (no delay). Clears any pending execution.
  clear: () => void; // Clear any pending execution of the function
};

/**
 * Returns a version of the provided function that is debounced, meaning that it will delay execution by the number of miliseconds provided to the `delay` parameter.
 *  If the debounced function is called an additional time during that delay then it will reset the delay and wait again. Therefore a debounced function
 *  will only execute once over a given period even if called multiple times. This is very useful for preventing repeated execution of
 *  functions attached to user events (like data submission, or validations on typing).
 *
 * Due to the limitations of function signatures in the TS type system, the debounced method is limited to a single input argument. If you want to debounce a function with multiple arguments,
 *  it is simple to wrap that method in an anonymous function that takes a single input (object or tuple) with all the arguments needed for the original function.
 *  For example, for:
 *    `function example(a: string, b: number): void;`
 *  you could debounce this as:
 *    `const debouncedExample = debounce((input: {a: string, b: number}) => { example(input.a, input.b); }, 1000);`
 *
 * The returned debounced function has two additional callable methods: `.now(input: Input)` and `.clear()`.
 *  Calling `.now(input)` will execute the stored function immediately, without delay, clearing pending execution of the stored function.
 *  Calling `.clear()` will remove any pending execution of the stored function. This is useful for allowing users to cancel their action before it executes.
 * @param fn
 * @param delay
 * @returns
 */
function debounce<Input>(fn: (input: Input) => void, delay: number): DebouncedFunction<Input> {
  let timeout: number | undefined;
  function output(input: Input): void {
    if (timeout) {
      clearInterval(timeout);
    }
    timeout = setTimeout(() => {
      fn(input);
    }, delay);
  }
  output.now = (input: Input) => {
    if (timeout) {
      clearInterval(timeout);
    }
    fn(input);
  };
  output.clear = () => {
    if (timeout) {
      clearInterval(timeout);
    }
  };
  return output;
}

export default debounce;
