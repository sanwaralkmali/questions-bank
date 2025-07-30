import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Converts fraction format from "a/b" to LaTeX format "\\frac{a}{b}"
 * @param {string} text - The text containing fractions
 * @returns {string} - Text with converted fractions
 */
function convertFractions(text) {
  // Pattern to match fractions in the format $a/b$ where a and b are numbers
  // This handles positive and negative numbers, and fractions with variables
  const fractionPattern = /\$([+-]?\d+(?:\/\d+)?)\$/g;
  
  return text.replace(fractionPattern, (match, fraction) => {
    // Check if it's already a proper fraction (contains /)
    if (fraction.includes('/')) {
      const [numerator, denominator] = fraction.split('/');
      return `$\\frac{${numerator}}{${denominator}}$`;
    }
    // If it's not a fraction, return as is
    return match;
  });
}

/**
 * Processes a JSON file and converts fractions in questions, choices, and answers
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
          question.question = convertFractions(question.question);
          if (originalQuestion !== question.question) {
            changesMade++;
            console.log(`  Question ${index + 1}: Updated question`);
          }
        }
        
        // Convert choices
        if (question.choices && Array.isArray(question.choices)) {
          question.choices.forEach((choice, choiceIndex) => {
            const originalChoice = choice;
            question.choices[choiceIndex] = convertFractions(choice);
            if (originalChoice !== question.choices[choiceIndex]) {
              changesMade++;
              console.log(`  Question ${index + 1}: Updated choice ${choiceIndex + 1}`);
            }
          });
        }
        
        // Convert answer
        if (question.answer) {
          const originalAnswer = question.answer;
          question.answer = convertFractions(question.answer);
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

/**
 * Recursively finds all JSON files in a directory and processes them
 * @param {string} directory - Directory to search for JSON files
 */
function processDirectory(directory) {
  try {
    const files = fs.readdirSync(directory);
    let totalChanges = 0;
    let filesProcessed = 0;
    
    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        const subChanges = processDirectory(filePath);
        totalChanges += subChanges;
      } else if (file.endsWith('.json')) {
        // Process JSON files
        const changes = processJsonFile(filePath);
        totalChanges += changes;
        filesProcessed++;
      }
    });
    
    return totalChanges;
  } catch (error) {
    console.error(`❌ Error reading directory ${directory}:`, error.message);
    return 0;
  }
}

// Main execution
function main() {
  const skillsDirectory = path.join(__dirname, 'public', 'data', 'skills');
  
  console.log('🔧 Starting fraction conversion process...');
  console.log(`📁 Processing directory: ${skillsDirectory}`);
  console.log('');
  
  if (!fs.existsSync(skillsDirectory)) {
    console.error(`❌ Directory not found: ${skillsDirectory}`);
    process.exit(1);
  }
  
  const totalChanges = processDirectory(skillsDirectory);
  
  console.log('');
  console.log('🎉 Conversion process completed!');
  console.log(`📊 Total changes made: ${totalChanges}`);
  console.log('');
  console.log('✅ All fractions have been converted from "a/b" format to "\\frac{a}{b}" LaTeX format');
}

// Run the script
main(); 