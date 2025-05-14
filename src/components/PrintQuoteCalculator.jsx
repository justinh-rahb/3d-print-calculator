import React, { useState, useEffect } from 'react';
import { Calculator, Printer, DollarSign, Clock, Scale, Package, Settings, Download } from 'lucide-react';

// This is the main component file that should be saved as src/components/PrintQuoteCalculator.jsx

export default function PrintQuoteCalculator({ darkMode }) {
  // State for input values
  const [materialCost, setMaterialCost] = useState(30);
  const [materialUse, setMaterialUse] = useState(0.1);
  const [unitsPerBatch, setUnitsPerBatch] = useState(4);
  const [timePerBatch, setTimePerBatch] = useState(3);
  const [operatorTime, setOperatorTime] = useState(0.5);
  const [operatorRate, setOperatorRate] = useState(50);
  const [machineDepreciation, setMachineDepreciation] = useState(5);
  const [totalUnits, setTotalUnits] = useState(20);
  const [markup, setMarkup] = useState(20);

  // State for calculated values
  const [results, setResults] = useState({
    materialCostTotal: 0,
    operatorCostTotal: 0,
    depreciationTotal: 0,
    subtotal: 0,
    markupAmount: 0,
    totalPrice: 0,
    pricePerUnit: 0,
    totalBatches: 0,
    totalPrintTime: 0
  });

  // Calculate quote whenever inputs change
  useEffect(() => {
    calculateQuote();
  }, [
    materialCost, 
    materialUse, 
    unitsPerBatch, 
    timePerBatch, 
    operatorTime,
    operatorRate,
    machineDepreciation,
    totalUnits,
    markup
  ]);

  // Add event listener for dark mode changes
  useEffect(() => {
    // Add event listener for dark mode changes
    const handleDarkModeChange = () => {
      // This will force a recalculation of the formatCurrency function
      // when dark mode is toggled to ensure proper display
      setResults({...results});
    };
    
    document.body.addEventListener('darkModeChange', handleDarkModeChange);
    
    // Clean up
    return () => {
      document.body.removeEventListener('darkModeChange', handleDarkModeChange);
    };
  }, [results]);

  const calculateQuote = () => {
    // Calculate total batches needed (rounded up)
    const totalBatches = Math.ceil(totalUnits / unitsPerBatch);
    
    // Calculate costs
    const materialCostTotal = materialCost * materialUse * totalUnits;
    const totalPrintTime = timePerBatch * totalBatches;
    const operatorCostTotal = operatorRate * operatorTime * totalBatches;
    const depreciationTotal = machineDepreciation * totalPrintTime;
    
    // Calculate final price
    const subtotal = materialCostTotal + operatorCostTotal + depreciationTotal;
    const markupAmount = subtotal * (markup / 100);
    const totalPrice = subtotal + markupAmount;
    const pricePerUnit = totalPrice / totalUnits;

    setResults({
      materialCostTotal,
      operatorCostTotal,
      depreciationTotal,
      subtotal,
      markupAmount,
      totalPrice,
      pricePerUnit,
      totalBatches,
      totalPrintTime
    });
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Generate quote text
  const generateQuoteText = () => {
    return `3D PRINTING QUOTE

Total Units: ${totalUnits}
Total Batches: ${results.totalBatches}
Total Print Time: ${results.totalPrintTime.toFixed(1)} hours

COSTS BREAKDOWN:
Materials: ${formatCurrency(results.materialCostTotal)}
Operator Time: ${formatCurrency(results.operatorCostTotal)}
Machine Depreciation: ${formatCurrency(results.depreciationTotal)}

Subtotal: ${formatCurrency(results.subtotal)}
Markup (${markup}%): ${formatCurrency(results.markupAmount)}

TOTAL QUOTE: ${formatCurrency(results.totalPrice)}
Price Per Unit: ${formatCurrency(results.pricePerUnit)}
`;
  };

  // Download quote as text file
  const downloadQuote = () => {
    const element = document.createElement("a");
    const file = new Blob([generateQuoteText()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "3D_Print_Quote.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <header className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Printer className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">3D Print Job Quote Calculator</h1>
        </div>
        <p className="text-gray-600">Generate accurate quotes for 3D printing services</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Settings size={20} className="text-blue-600" />
            Input Parameters
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Material Cost */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} className="text-blue-600" />
                    Material Cost ($/kg)
                  </div>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={materialCost}
                  onChange={(e) => setMaterialCost(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Material Use */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <Scale size={16} className="text-blue-600" />
                    Material Use per Unit (kg)
                  </div>
                </label>
                <input
                  type="number" 
                  min="0.001"
                  step="0.001"
                  value={materialUse}
                  onChange={(e) => setMaterialUse(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Units Per Batch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <Package size={16} className="text-blue-600" />
                    Units Per Batch
                  </div>
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={unitsPerBatch}
                  onChange={(e) => setUnitsPerBatch(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Time Per Batch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-blue-600" />
                    Time Per Batch (hours)
                  </div>
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={timePerBatch}
                  onChange={(e) => setTimePerBatch(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Operator Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-blue-600" />
                    Operator Time per Batch (hours)
                  </div>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={operatorTime}
                  onChange={(e) => setOperatorTime(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Operator Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} className="text-blue-600" />
                    Operator Rate ($/hour)
                  </div>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={operatorRate}
                  onChange={(e) => setOperatorRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Machine Depreciation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} className="text-blue-600" />
                    Machine Depreciation ($/hour)
                  </div>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={machineDepreciation}
                  onChange={(e) => setMachineDepreciation(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Total Units */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <Package size={16} className="text-blue-600" />
                    Total Units Required
                  </div>
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={totalUnits}
                  onChange={(e) => setTotalUnits(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Markup Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-1">
                  <DollarSign size={16} className="text-blue-600" />
                  Markup Percentage (%)
                </div>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={markup}
                onChange={(e) => setMarkup(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-blue-50 p-4 rounded-lg flex flex-col">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calculator size={20} className="text-blue-600" />
            Quote Results
          </h2>
          
          <div className="flex-grow space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded shadow">
                <h3 className="text-sm text-gray-500">Total Batches</h3>
                <p className="text-lg font-medium">{results.totalBatches}</p>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <h3 className="text-sm text-gray-500">Print Time</h3>
                <p className="text-lg font-medium">{results.totalPrintTime.toFixed(1)} hours</p>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded shadow">
              <h3 className="text-sm text-gray-500 mb-2">Cost Breakdown</h3>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>Materials:</span>
                  <span>{formatCurrency(results.materialCostTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Operator Time:</span>
                  <span>{formatCurrency(results.operatorCostTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Machine Depreciation:</span>
                  <span>{formatCurrency(results.depreciationTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-1 border-t">
                  <span>Subtotal:</span>
                  <span className="font-medium">{formatCurrency(results.subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Markup ({markup}%):</span>
                  <span>{formatCurrency(results.markupAmount)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-600 text-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">TOTAL QUOTE</h3>
                <span className="text-xl font-bold">{formatCurrency(results.totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center mt-2 text-blue-100">
                <span>Price per unit:</span>
                <span>{formatCurrency(results.pricePerUnit)}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={downloadQuote}
            className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <Download size={18} />
            Download Quote
          </button>
        </div>
      </div>
    </div>
  );
}