import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Skills organized by difficulty (Easy -> Medium -> Hard)
const skillsByDifficulty = {
  Easy: [
    { id: "integers", filename: "integers-operations.json", title: "Integer Operations" },
    { id: "fraction-decimal", filename: "fraction-decimal.json", title: "Fraction to Decimal" },
    { id: "fraction-percentage", filename: "fraction-percentage.json", title: "Fraction to Percentage" },
    { id: "decimal-percentage", filename: "decimal-percentage.json", title: "Decimal to Percentage" }
  ],
  Medium: [
    { id: "fractions-operations", filename: "fractions-operations.json", title: "Fraction Fundamentals" },
    { id: "decimals", filename: "decimals-operations.json", title: "Decimal Operations" },
    { id: "mixed-problems", filename: "mixed-problems.json", title: "Mixed Problems" },
    { id: "order-of-operations", filename: "order-of-operations.json", title: "Order of Operations" },
    { id: "algebra-basics", filename: "algebra-basics.json", title: "Algebra Builder" },
    { id: "mixed-conversion", filename: "mixed-conversion.json", title: "Mixed Conversion" },
    { id: "basic-scientific-notation", filename: "basic-scientific-notation.json", title: "Basic Scientific Notation" },
    { id: "classification-numbers", filename: "classification-numbers.json", title: "Classification of Numbers" },
    { id: "operations-scientific-notation", filename: "operations-scientific-notation.json", title: "Operations with Scientific Notation" },
    { id: "simplify-expressions", filename: "simplify-expressions.json", title: "Simplify Expressions" },
    { id: "solving-equations", filename: "solving-equations.json", title: "Solving Equations" },
    { id: "solving-inequalities", filename: "solving-inequalities.json", title: "Solving Inequalities" },
    { id: "gcf-factoring", filename: "gcf-factoring.json", title: "GCF Factoring" },
    { id: "factoring-trinomials-1", filename: "factoring-trinomials-1.json", title: "Factoring Trinomials (x² + bx + c)" },
    { id: "difference-squares", filename: "difference-squares.json", title: "Factoring Difference of Squares" },
    { id: "solving-equations-by-factoring", filename: "solving-equations-by-factoring.json", title: "Solving Equations by Factoring" },
    { id: "understanding-polynomials", filename: "understanding-polynomials.json", title: "Understanding Polynomials" },
    { id: "adding-subtracting-polynomials", filename: "adding-subtracting-polynomials.json", title: "Adding and Subtracting Polynomials" }
  ],
  Hard: [
    { id: "factoring-by-grouping", filename: "factoring-by-grouping.json", title: "Factoring by Grouping" },
    { id: "factoring-trinomials-2", filename: "factoring-trinomials-2.json", title: "Factoring Trinomials (ax² + bx + c)" },
    { id: "difference-sum-of-cubes", filename: "difference-sum-of-cubes.json", title: "Factoring Difference of Cubes" },
    { id: "perfect-squares", filename: "perfect-squares.json", title: "Factoring Perfect Squares" },
    { id: "quadratic-formula", filename: "quadratic-formula.json", title: "Solving by Quadratic Formula" },
    { id: "multiplying-polynomials", filename: "multiplying-polynomials.json", title: "Multiplying Polynomials" }
  ]
};

// Create the complete ordered list
const allSkills = [
  ...skillsByDifficulty.Easy,
  ...skillsByDifficulty.Medium,
  ...skillsByDifficulty.Hard
];

// Create mapping from old filename to new filename
const fileMapping = {};
allSkills.forEach((skill, index) => {
  const newFilename = `${index + 1}-${skill.id}.json`;
  fileMapping[skill.filename] = {
    newFilename,
    skillId: skill.id,
    title: skill.title,
    number: index + 1
  };
});

/**
 * Rename files in the skills directory
 */
function renameFiles() {
  const skillsDirectory = path.join(__dirname, 'public', 'data', 'skills');
  
  console.log('🔧 Starting file renaming process...');
  console.log(`📁 Skills directory: ${skillsDirectory}`);
  console.log('');
  
  if (!fs.existsSync(skillsDirectory)) {
    console.error(`❌ Directory not found: ${skillsDirectory}`);
    return;
  }
  
  let renamedCount = 0;
  
  // Rename each file
  Object.entries(fileMapping).forEach(([oldFilename, mapping]) => {
    const oldPath = path.join(skillsDirectory, oldFilename);
    const newPath = path.join(skillsDirectory, mapping.newFilename);
    
    if (fs.existsSync(oldPath)) {
      try {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ Renamed: ${oldFilename} → ${mapping.newFilename} (${mapping.title})`);
        renamedCount++;
      } catch (error) {
        console.error(`❌ Error renaming ${oldFilename}:`, error.message);
      }
    } else {
      console.warn(`⚠️  File not found: ${oldFilename}`);
    }
  });
  
  console.log('');
  console.log(`🎉 Renamed ${renamedCount} files successfully!`);
}

/**
 * Update games.json with new file references
 */
function updateGamesJson() {
  const gamesPath = path.join(__dirname, 'public', 'data', 'games.json');
  
  console.log('📝 Updating games.json...');
  
  try {
    const gamesData = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));
    
    // Update each skill entry with the new filename
    gamesData.forEach(skill => {
      const oldFilename = `${skill.id}.json`;
      if (fileMapping[oldFilename]) {
        skill.filename = fileMapping[oldFilename].newFilename;
        console.log(`  Updated ${skill.title}: ${oldFilename} → ${skill.filename}`);
      }
    });
    
    // Write the updated data back
    fs.writeFileSync(gamesPath, JSON.stringify(gamesData, null, 2), 'utf8');
    console.log('✅ games.json updated successfully!');
    
  } catch (error) {
    console.error(`❌ Error updating games.json:`, error.message);
  }
}

/**
 * Update filters.json with new file references
 */
function updateFiltersJson() {
  const filtersPath = path.join(__dirname, 'public', 'data', 'filters.json');
  
  console.log('📝 Updating filters.json...');
  
  try {
    const filtersData = JSON.parse(fs.readFileSync(filtersPath, 'utf8'));
    
    // Update each filter entry with the new filename
    filtersData.forEach(filter => {
      const oldFilename = `${filter.id}.json`;
      if (fileMapping[oldFilename]) {
        filter.filename = fileMapping[oldFilename].newFilename;
        console.log(`  Updated ${filter.title}: ${oldFilename} → ${filter.filename}`);
      }
    });
    
    // Write the updated data back
    fs.writeFileSync(filtersPath, JSON.stringify(filtersData, null, 2), 'utf8');
    console.log('✅ filters.json updated successfully!');
    
  } catch (error) {
    console.error(`❌ Error updating filters.json:`, error.message);
  }
}

/**
 * Generate a summary of the new file structure
 */
function generateSummary() {
  console.log('');
  console.log('📊 NEW FILE STRUCTURE SUMMARY:');
  console.log('================================');
  
  allSkills.forEach((skill, index) => {
    const newFilename = `${index + 1}-${skill.id}.json`;
    const difficulty = 
      skillsByDifficulty.Easy.includes(skill) ? 'Easy' :
      skillsByDifficulty.Medium.includes(skill) ? 'Medium' :
      skillsByDifficulty.Hard.includes(skill) ? 'Hard' : 'Unknown';
    
    console.log(`${String(index + 1).padStart(2, '0')}. ${newFilename} (${difficulty}) - ${skill.title}`);
  });
  
  console.log('');
  console.log('✅ All files have been renamed and references updated!');
}

// Main execution
function main() {
  console.log('🚀 Starting comprehensive file renaming process...');
  console.log('');
  
  // Step 1: Rename files
  renameFiles();
  
  // Step 2: Update games.json
  updateGamesJson();
  
  // Step 3: Update filters.json
  updateFiltersJson();
  
  // Step 4: Generate summary
  generateSummary();
}

// Run the script
main(); 