import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to extract LaTeX expressions from text
export const extractLatexExpressions = (text: string): string[] => {
  const latexExpressions: string[] = [];
  
  // Match different LaTeX patterns
  const patterns = [
    /\$([^$]+)\$/g,           // Inline math: $...$
    /\\\(([^)]+)\\\)/g,        // Inline math: \(...\)
    /\\\[([^\]]+)\\\]/g,       // Block math: \[...\]
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      latexExpressions.push(match[1]); // Extract the content inside delimiters
    }
  });
  
  return latexExpressions;
};

// Function to copy text to clipboard with fallback
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    
    // Last resort: try to show the text to user
    try {
      alert(`Copy this text manually:\n\n${text}`);
      return true;
    } catch (alertError) {
      console.error('Failed to show alert:', alertError);
      return false;
    }
  }
};

// Function to copy LaTeX expression with proper formatting for Word
export const copyLatexForWord = async (latexExpression: string): Promise<boolean> => {
  try {
    // Convert LaTeX to Word equation format
    const wordEquation = convertLatexToWordEquation(latexExpression);
    
    // Copy the equation in a format that Word can recognize
    const success = await copyToClipboard(wordEquation);
    
    if (success) {
      // Show success message with instructions
      toast.success("Equation copied!", {
        description: "In Word: Insert > Equation > Paste to convert to equation",
        duration: 3000,
      });
    }
    
    return success;
  } catch (error) {
    console.error('Error copying LaTeX for Word:', error);
    toast.error("Failed to copy equation");
    return false;
  }
};

// Function to convert LaTeX to Word equation format
const convertLatexToWordEquation = (latex: string): string => {
  // Convert LaTeX to Word's equation format
  // Word uses a specific format that can be pasted as equations
  
  let wordEquation = latex;
  
  // Remove LaTeX delimiters if present
  wordEquation = wordEquation.replace(/^\$|\$$/g, '');
  
  // Convert LaTeX to Word equation syntax
  const conversions = [
    // Fractions
    { from: /\\frac\{([^}]+)\}\{([^}]+)\}/g, to: '($1)/($2)' },
    // Square root
    { from: /\\sqrt\{([^}]+)\}/g, to: '√($1)' },
    // Text
    { from: /\\text\{([^}]+)\}/g, to: '$1' },
    // Basic math symbols
    { from: /\\times/g, to: '×' },
    { from: /\\div/g, to: '÷' },
    { from: /\\pm/g, to: '±' },
    // Greek letters
    { from: /\\alpha/g, to: 'α' },
    { from: /\\beta/g, to: 'β' },
    { from: /\\gamma/g, to: 'γ' },
    { from: /\\delta/g, to: 'δ' },
    { from: /\\theta/g, to: 'θ' },
    { from: /\\pi/g, to: 'π' },
    { from: /\\sigma/g, to: 'σ' },
    { from: /\\omega/g, to: 'ω' },
    // Subscripts and superscripts
    { from: /(\w+)_\{([^}]+)\}/g, to: '$1_$2' },
    { from: /(\w+)\^\{([^}]+)\}/g, to: '$1^$2' },
  ];
  
  // Apply conversions
  conversions.forEach(({ from, to }) => {
    wordEquation = wordEquation.replace(from, to);
  });
  
  // Return in Word equation format
  // This format can be pasted into Word and converted to equations
  return wordEquation;
};
