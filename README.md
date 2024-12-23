# React OTP Input Component

A customizable, accessible, and feature-rich OTP (One-Time Password) input component for React applications.

![OTP Input Demo](https://github.com/user-attachments/assets/f8118c36-729f-4929-87c2-fd3080a924ff)

## Features

- 🔢 Customizable number of input fields (1-12 digits)
- ⌨️ Smart keyboard navigation
  - Arrow keys support
  - Auto-focus next field
  - Backspace navigation
- 📋 Paste support for quick OTP entry
- 🎨 Modern, responsive design
- ♿ Accessibility features
- 🔒 Number-only input validation
- 🎯 Auto-submit capability

## Installation

```bash
npm install react-otp-input
# or
yarn add react-otp-input
```

## Usage

```jsx
import OtpInput from './components/OtpInput';

function App() {
  const handleSubmit = (otp) => {
    console.log('Submitted OTP:', otp);
  };

  return (
    <OtpInput onSubmit={handleSubmit} />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onSubmit | function | - | Callback function called with completed OTP string |
| defaultCount | number | 5 | Initial number of OTP input fields |

## Features in Detail

### Keyboard Navigation
- **Arrow Keys**: Navigate between input fields
- **Backspace**: Delete and move to previous field
- **Numbers**: Auto-advance to next field

### Paste Functionality
- Supports pasting full OTP
- Automatically distributes digits across fields
- Validates pasted content (numbers only)

### Input Validation
- Accepts only numeric input
- Prevents illegal characters
- Maximum 1 digit per field

### Auto-focus Behavior
- First field focused on mount
- Next field focus after input
- Previous field focus on backspace

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
