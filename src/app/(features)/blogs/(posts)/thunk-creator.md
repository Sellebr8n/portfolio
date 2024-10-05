---
title: 'Introducing ThunkCreator: Simplifying Asynchronous Redux Thunks'
date: 'April 20, 2024'
---

If you've worked with Redux in any moderately complex application, chances are you've encountered the need for asynchronous actions. While Redux itself doesn't inherently support asynchronous behavior, Redux Thunks have become a popular middleware solution for managing side effects in Redux applications. However, writing and managing Thunks can sometimes be cumbersome and repetitive. Enter ThunkCreator, a utility designed to streamline the process of creating asynchronous Redux Thunks.

## What is ThunkCreator?

ThunkCreator is a utility function that generates asynchronous Redux Thunks based on a provided action type and an input function. It abstracts away much of the boilerplate code typically associated with writing Thunks, allowing developers to focus more on the logic of their asynchronous operations rather than the setup and management of Thunk actions.

## How does ThunkCreator work?

Let's dive into the code to understand how ThunkCreator operates:

```ts
import { RootState } from 'app/reducer';
import { Thunk, ThunkAppDispatch } from 'app/store';
import { AnyAction } from 'redux';
import { actionCreator } from './actionCreator';

// Types used within ThunkCreator
type Store = {
  dispatch: ThunkAppDispatch;
  getState: () => RootState;
};
type Success<T> = { data: T; error: null };
type Failure = { data: null; error: Error };
type Response<T> = Success<T> | Failure;
type AsyncThunk<Return> = Thunk<Promise<Response<Return>>>;
type AnyFunc = (...args: any[]) => any;
type ArgumentTypes<F extends AnyFunc> = F extends (store: Store, ...args: infer A) => any ? A : never;

// ThunkCreator function definition
export function thunkCreator<TC extends (store: Store, ...args: any[]) => any>(
  type: string,
  inputFn: TC
): ((...args: ArgumentTypes<TC>) => AsyncThunk<ReturnType<TC>>) & {
  fulfilled(action: AnyAction): action is {
    type: string;
    data: Awaited<ReturnType<TC>>;
    meta: ArgumentTypes<TC>;
  };
  pending(action: AnyAction): action is { type: string; meta: ArgumentTypes<TC> };
  rejected(action: AnyAction): action is { type: string; data: undefined; error: Error; meta: ArgumentTypes<TC> };
} {
  // Implementation details omitted for brevity
}
```

## Key Features of ThunkCreator
-  **Automated Action Creation:** ThunkCreator automatically generates pending, fulfilled, and rejected actions based on the provided action type.
-  **Error Handling:** It simplifies error handling by automatically dispatching a rejected action with the error details.
-  **Type Safety:** ThunkCreator leverages TypeScript to ensure type safety throughout the process, reducing the chances of runtime errors.

## Example Usage

```ts
import { thunkCreator } from './thunkCreator';
import { fetchData } from './api';

// Define an asynchronous action type and input function
const fetchUserData = thunkCreator('FETCH_USER_DATA', async ({ dispatch, getState }, userId: string) => {
  // Perform asynchronous operation (e.g., fetching data from an API)
  const data = await fetchData(userId);
  return data;
});

// Dispatch the thunk action
store.dispatch(fetchUserData('123'));
```

## Conclusion
ThunkCreator simplifies the process of creating asynchronous Redux Thunks, allowing developers to write cleaner and more maintainable code. By abstracting away the repetitive boilerplate, it empowers developers to focus on the core logic of their asynchronous operations. Whether you're building a small application or a large-scale enterprise solution, ThunkCreator can help streamline your Redux workflow.