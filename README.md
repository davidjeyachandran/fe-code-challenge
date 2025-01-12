# Frontend Code Challenge

A React application featuring a form dialog with validation and API integration.

## Features

- Material-UI based dialog form
- Form validation
- API integration with error handling
- TypeScript support
- Jest & React Testing Library tests

## functionality
- simple yet clean homepage for them that allow users to enter their name and email to receive email invitations.

## Visual Requirements
- The UI should occupy the full height of the screen.
- Shows a fixed header that is always on top of the window and a footer that is always on the bottom of the window (assuming a reasonable window height).
- The page content is sandwiched in the middle, containing just a heading, a small piece of text and a button to request an invite.
- A rough mockup of the basic layout is attached. While preserving this layout on desktop, you may style it however you wish, with or without images.
- The solution must be mobile friendly (users won't need to pinch and zoom on their mobile devices).


## Getting Started

### Prerequisites

- Node.js >= 18.x
- yarn >= 1.22.0

### Installation

```bash
yarn
```

### Available Scripts

- `yarn start` - Runs the app in development mode at [http://localhost:3000](http://localhost:3000)
- `yarn test` - Launches the test runner in interactive watch mode
- `yarn run build` - Builds the app for production to the `build` folder
- `yarn run eject` - Remove the single build dependency

## Project Structure

```
src/
  ├── components/
  │   └── FormDialog/       # Form dialog component with tests
  ├── hooks/               
  │   ├── useSendData/     # API integration hook
  │   └── useFormValidation/# Form validation hook
  └── App.tsx              # Root component
```

## Testing

The project uses Jest and React Testing Library for testing. Run the tests with:

```bash
yarn test
```

## Built With

- React 18
- TypeScript
- Material-UI
- React Testing Library

## Development Notes

- Form validation is handled by a custom hook
- API calls are managed through a dedicated hook
- Tests cover both success and error scenarios
