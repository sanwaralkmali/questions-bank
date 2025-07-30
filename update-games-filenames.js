import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping from skill IDs to new filenames
const skillIdToFilename = {
  "integers": "1-integers.json",
  "fraction-decimal": "2-fraction-decimal.json",
  "fraction-percentage": "3-fraction-percentage.json",
  "decimal-percentage": "4-decimal-percentage.json",
  "fractions-operations": "5-fractions-operations.json",
  "decimals": "6-decimals.json",
  "mixed-problems": "7-mixed-problems.json",
  "order-of-operations": "8-order-of-operations.json",
  "algebra-basics": "9-algebra-basics.json",
  "mixed-conversion": "10-mixed-conversion.json",
  "basic-scientific-notation": "11-basic-scientific-notation.json",
  "classification-numbers": "12-classification-numbers.json",
  "operations-scientific-notation": "13-operations-scientific-notation.json",
  "simplify-expressions": "14-simplify-expressions.json",
  "solving-equations": "15-solving-equations.json",
  "solving-inequalities": "16-solving-inequalities.json",
  "gcf-factoring": "17-gcf-factoring.json",
  "factoring-trinomials-1": "18-factoring-trinomials-1.json",
  "difference-squares": "19-difference-squares.json",
  "solving-equations-by-factoring": "20-solving-equations-by-factoring.json",
  "understanding-polynomials": "21-understanding-polynomials.json",
  "adding-subtracting-polynomials": "22-adding-subtracting-polynomials.json",
  "factoring-by-grouping": "23-factoring-by-grouping.json",
  "factoring-trinomials-2": "24-factoring-trinomials-2.json",
  "difference-sum-of-cubes": "25-difference-sum-of-cubes.json",
  "perfect-squares": "26-perfect-squares.json",
  "quadratic-formula": "27-quadratic-formula.json",
  "multiplying-polynomials": "28-multiplying-polynomials.json"
};

/**
 * Update games.json to include filename field for all entries
 */
function updateGamesJson() {
  const gamesPath = path.join(__dirname, 'public', 'data', 'games.json');
  
  console.log('📝 Updating games.json with filename fields...');
  
  try {
    const gamesData = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));
    
    // Update each skill entry with the filename field
    gamesData.forEach(skill => {
      if (skillIdToFilename[skill.id]) {
        skill.filename = skillIdToFilename[skill.id];
        console.log(`  Updated ${skill.title}: ${skill.id} → ${skill.filename}`);
      } else {
        console.warn(`  ⚠️  No filename mapping found for skill ID: ${skill.id}`);
      }
    });
    
    // Write the updated data back
    fs.writeFileSync(gamesPath, JSON.stringify(gamesData, null, 2), 'utf8');
    console.log('✅ games.json updated successfully!');
    
  } catch (error) {
    console.error(`❌ Error updating games.json:`, error.message);
  }
}

// Run the script
updateGamesJson(); 