// components/loader.tsx
import React from "react";

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f6f0eb' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="150"
        height="150"
        style={{ animation: "spin 2s linear infinite" }}
      >

        <path
          d="M100,10 C110,30 90,50 100,90 C120,120 80,120 100,150"
          fill="none"
          stroke="#DAA520"
          strokeWidth="4"
        />

        <path
          d="M100,150 Q130,160 140,200 Q70,190 60,150"
          fill="#D4AF37"
        >
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values="
              M100,150 Q130,160 140,200 Q70,190 60,150;
              M100,150 Q120,180 130,200 Q70,170 60,150;
              M100,150 Q130,160 140,200 Q70,190 60,150;
            "
          />
        </path>
      </svg>
    </div>
  );
};

export default Loader;
