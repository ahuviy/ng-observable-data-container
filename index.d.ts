import { Observable } from 'rxjs';

/**
 * Creates an RxJS-based observable data container.
 * 
 * @param initialState The initial state.
 */
export declare function DataContainer<T>(initialState: T): WritableDataContainer<T>;

export interface WritableDataContainer<T> {
  /**
   * The observable state of the data.
   */
  stream: Observable<T>;

  /**
   * The current value of the data.
   */
  readonly value: T;

  /**
   * Publish a new data value.
   * 
   * @param transformer A function that receives the previous state and returns the new state.
   */
  publish(transformer?: (value: T) => T): void;

  /**
   * Returns the readonly version of the data-container,
   * without the ability to publish (push updates).
   */
  toReadonly(): ReadonlyDataContainer<T>;
}

export interface ReadonlyDataContainer<T> {
  /**
   * The observable state of the data.
   */
  stream: Observable<T>;
  
  /**
   * The current value of the data.
   */
  readonly value: T;
}
