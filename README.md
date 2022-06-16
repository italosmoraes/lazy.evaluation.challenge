## Code Challenge

Lazy expression evaluation solution.

The solution does not guard against bad usage of the added functions, such as:
- missing arguments
- incorrect argument types
- calling `evaluate` before any functions have been added

The tests only account for happy path usage of the `Lazy` class

### Environment

This project was built using:
- yarn
- nvm
- Node v16.15.0
- Jest
- Typescript
- VSCode


### To run test suite:

> nvm use

> yarn

> yarn test
