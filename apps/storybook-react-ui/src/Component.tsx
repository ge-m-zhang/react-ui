import React from 'react';

export default function Component(): React.JSX.Element {
  return (
    <div className="bg-pink-500 hover:bg-blue-500 transition-colors duration-200 p-4 rounded">
      Hover to change color.
    </div>
  );
}
