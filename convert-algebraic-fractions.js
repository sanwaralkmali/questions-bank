import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Converts algebraic fraction format from "1/x^n" to LaTeX format "\\frac{1}{x^n}"
 * @param {string} text - The text containing fractions
 * @returns {string} - Text with converted fractions
 */
function convertAlgebraicFractions(text) {
  let result = text;
  
  // Pattern 1: Simple algebraic fractions like 1/x, 1/y, etc.
  result = result.replace(/\$([^$]*?)(1\/x)([^$]*?)\$/g, (match, before, fraction, after) => {
    return `$${before}\\frac{1}{x}${after}$`;
  });
  
  result = result.replace(/\$([^$]*?)(1\/y)([^$]*?)\$/g, (match, before, fraction, after) => {
    return `$${before}\\frac{1}{y}${after}$`;
  });
  
  // Pattern 2: Algebraic fractions with powers like 1/x^2, 1/x^3, etc.
  result = result.replace(/\$([^$]*?)(1\/x\^(\d+))([^$]*?)\$/g, (match, before, fraction, power, after) => {
    return `$${before}\\frac{1}{x^${power}}${after}$`;
  });
  
  result = result.replace(/\$([^$]*?)(1\/y\^(\d+))([^$]*?)\$/g, (match, before, fraction, power, after) => {
    return `$${before}\\frac{1}{y^${power}}${after}$`;
  });
  
  // Pattern 3: Algebraic fractions with variables like 1/a^n, 1/b^n, etc.
  result = result.replace(/\$([^$]*?)(1\/a\^(\w+))([^$]*?)\$/g, (match, before, fraction, power, after) => {
    return `$${before}\\frac{1}{a^${power}}${after}$`;
  });
  
  result = result.replace(/\$([^$]*?)(1\/b\^(\w+))([^$]*?)\$/g, (match, before, fraction, power, after) => {
    return `$${before}\\frac{1}{b^${power}}${after}$`;
  });
  
  // Pattern 4: More general algebraic fractions like 1/variable^n
  result = result.replace(/\$([^$]*?)(1\/([a-zA-Z])\^(\w+))([^$]*?)\$/g, (match, before, fraction, variable, power, after) => {
    return `$${before}\\frac{1}{${variable}^${power}}${after}$`;
  });
  
  // Pattern 5: Simple algebraic fractions like 1/variable
  result = result.replace(/\$([^$]*?)(1\/([a-zA-Z]))([^$]*?)\$/g, (match, before, fraction, variable, after) => {
    return `$${before}\\frac{1}{${variable}}${after}$`;
  });
  
  return result;
}

/**
 * Processes a JSON file and converts algebraic fractions in questions, choices, and answers
 * @param {string} filePath - Path to the JSON file
 */
function processJsonFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);
    
    // Read the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    let changesMade = 0;
    
    // Process questions array
    if (data.questions && Array.isArray(data.questions)) {
      data.questions.forEach((question, index) => {
        // Convert question text
        if (question.question) {
          const originalQuestion = question.question;
          question.question = convertAlgebraicFractions(question.question);
          if (originalQuestion !== question.question) {
            changesMade++;
            console.log(`  Question ${index + 1}: Updated question`);
          }
        }
        
        // Convert choices
        if (question.choices && Array.isArray(question.choices)) {
          question.choices.forEach((choice, choiceIndex) => {
            const originalChoice = choice;
            question.choices[choiceIndex] = convertAlgebraicFractions(choice);
            if (originalChoice !== question.choices[choiceIndex]) {
              changesMade++;
              console.log(`  Question ${index + 1}: Updated choice ${choiceIndex + 1}`);
            }
          });
        }
        
        // Convert answer
        if (question.answer) {
          const originalAnswer = question.answer;
          question.answer = convertAlgebraicFractions(question.answer);
          if (originalAnswer !== question.answer) {
            changesMade++;
            console.log(`  Question ${index + 1}: Updated answer`);
          }
        }
      });
    }
    
    // Write the updated content back to the file
    if (changesMade > 0) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✅ Updated ${filePath} with ${changesMade} changes`);
    } else {
      console.log(`ℹ️  No changes needed for ${filePath}`);
    }
    
    return changesMade;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

// Main execution
function main() {
  const skillsDirectory = path.join(__dirname, 'public', 'data', 'skills');
  
  // Specific file to process
  const specificFile = path.join(skillsDirectory, 'multiplying-polynomials.json');
  
  console.log('🔧 Starting algebraic fraction conversion process for multiplying-polynomials.json...');
  console.log(`📁 Processing directory: ${skillsDirectory}`);
  console.log('');
  
  if (!fs.existsSync(skillsDirectory)) {
    console.error(`❌ Directory not found: ${skillsDirectory}`);
    process.exit(1);
  }
  
  if (fs.existsSync(specificFile)) {
    const changes = processJsonFile(specificFile);
    console.log('');
    console.log('🎉 Conversion process completed!');
    console.log(`📊 Total changes made: ${changes}`);
    console.log('');
    console.log('✅ All algebraic fractions have been converted to proper LaTeX format');
  } else {
    console.error(`❌ File not found: ${specificFile}`);
  }
}

// Run the script
main(); 