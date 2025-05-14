# 3D Print Job Quote Calculator

A professional, interactive web application for calculating and generating quotes for 3D printing services. This tool helps you provide accurate pricing for customers by factoring in material costs, operator time, machine depreciation, and your desired markup.

## Features

- **User-friendly interface** with real-time calculations
- **Comprehensive cost breakdown** including:
  - Material costs
  - Operator time
  - Machine depreciation
- **Automatic calculations** for:
  - Total batches required
  - Total print time
  - Cost per unit
- **Professional quote generation** with downloadable text file
- **Mobile-responsive design** works on all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/3d-print-calculator.git
cd 3d-print-calculator
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

The application will open in your browser at http://localhost:3000

## Usage

1. Enter your pricing parameters:
   - Material cost per kg
   - Material use per unit (kg)
   - Units per batch
   - Time per batch (hours)
   - Operator time per batch (hours)
   - Operator hourly rate
   - Machine depreciation per hour
   - Total units required
   - Markup percentage

2. View the calculated results in real-time
3. Download a formatted quote using the "Download Quote" button

## Customization

You can customize the default values by editing the initial state values in the `PrintQuoteCalculator.jsx` file:

```javascript
const [materialCost, setMaterialCost] = useState(30); // Default material cost
const [operatorRate, setOperatorRate] = useState(50); // Default operator rate
// etc.
```

## Deployment

This application can be deployed to any static site hosting service including:
- GitHub Pages
- Vercel
- Netlify
- Coolify (self-hosted)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Lucide React icons
- Styled with plain CSS for maximum compatibility