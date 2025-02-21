import React, { useState } from 'react';
import { Braces, Copy, RotateCcw } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      if (!input.trim()) {
        setError('Please enter JSON to format');
        setOutput('');
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const resetFields = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Braces className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">JSON Formatter</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Transform your JSON data into a beautifully formatted and readable structure.
            Simply paste your JSON and let the magic happen!
          </p>
          
          {/* Format Button - Moved to top */}
          <button
            onClick={formatJSON}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Format JSON
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Input JSON</h2>
            <textarea
              className="w-full h-[400px] p-4 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
            />
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Formatted Output</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!output}
                  className="p-2 text-gray-600 hover:text-indigo-600 disabled:opacity-50"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={resetFields}
                  className="p-2 text-gray-600 hover:text-indigo-600"
                  title="Reset"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
            <pre className="w-full h-[400px] p-4 bg-gray-50 rounded-lg font-mono text-sm overflow-auto">
              {output || 'Formatted JSON will appear here'}
            </pre>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-600 border-t border-gray-200">
        <p>Made with ❤️ for developers</p>
      </footer>
    </div>
  );
}

export default App;