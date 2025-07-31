import React, { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import { Copy, Check } from "lucide-react";
import { copyLatexForWord } from "@/lib/utils";
import { toast } from "sonner";

interface InteractiveLatexProps {
  math: string;
  isBlock?: boolean;
  className?: string;
}

const InteractiveLatex: React.FC<InteractiveLatexProps> = ({ 
  math, 
  isBlock = false, 
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const success = await copyLatexForWord(math);
      
      if (success) {
        setIsCopied(true);
        // Reset copied state after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error copying LaTeX:", error);
    }
  };

  return (
    <div
      className={`relative inline-block group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LaTeX Expression */}
      <div className="relative">
        {isBlock ? (
          <BlockMath math={math} />
        ) : (
          <InlineMath math={math} />
        )}
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-blue-50 bg-opacity-50 rounded border-2 border-blue-300 transition-all duration-200 flex items-center justify-center">
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
              title="Copy equation"
            >
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Tooltip */}
      {isHovered && !isCopied && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10">
          Click to copy equation
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default InteractiveLatex; 