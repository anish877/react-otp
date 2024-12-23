import React, { useEffect, useRef, useState } from 'react';
import { Lock, Send, Hash } from 'lucide-react';

const OtpInput = ({ onSubmit }) => {
  const [numOfBlocks, setNumOfBlocks] = useState(5);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const blocksRefs = useRef([]);
  const [values, setValues] = useState(Array(numOfBlocks).fill(''));

  useEffect(() => {
    setValues(Array(numOfBlocks).fill(''));
    setAllFieldsFilled(false);
  }, [numOfBlocks]);

  const handleOtpInputChange = (e, index) => {
    if (!isFinite(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      return;
    }

    const newValues = [...values];
    
    if (e.key === 'Backspace') {
      newValues[index] = '';
      setValues(newValues);
      if (index > 0) blocksRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      blocksRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < numOfBlocks - 1) {
      blocksRefs.current[index + 1].focus();
    } else if (isFinite(e.key)) {
      newValues[index] = e.key;
      setValues(newValues);
      if (index < numOfBlocks - 1) blocksRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    setAllFieldsFilled(values.every(value => value !== ''));
  }, [values]);

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, numOfBlocks);
    const newValues = [...values];
    
    [...pastedData].forEach((char, index) => {
      if (isFinite(char)) newValues[index] = char;
    });
    
    setValues(newValues);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-8">
      <div className="flex items-center justify-center gap-2 text-gray-700">
        <Lock className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">OTP Verification</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-gray-500" />
          <input
            type="number"
            min="1"
            max="12"
            className="w-20 p-2 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={numOfBlocks}
            onChange={(e) => setNumOfBlocks(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center" onPaste={handlePaste}>
          {Array(numOfBlocks).fill().map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={values[index]}
              ref={(el) => blocksRefs.current[index] = el}
              onKeyDown={(e) => handleOtpInputChange(e, index)}
              onChange={() => {}}
              className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          ))}
        </div>
      </div>

      <button
        className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
          allFieldsFilled 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!allFieldsFilled}
        onClick={() => onSubmit?.(values.join(''))}
      >
        <Send className="w-5 h-5" />
        <span>Verify OTP</span>
      </button>
    </div>
  );
};

export default OtpInput;