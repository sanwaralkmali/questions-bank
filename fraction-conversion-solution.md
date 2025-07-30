# Fraction Conversion Solution

## Problem Description

The JSON files in the Math Questions Bank contain fractions in the format `"$1/2$"` instead of the proper LaTeX format `"$\\frac{1}{2}$"`. This causes rendering issues because:

1. **Incorrect LaTeX Syntax**: The format `$1/2$` is not valid LaTeX for fractions
2. **Poor Rendering**: Fractions don't display properly in the math equations
3. **Inconsistent Formatting**: Some fractions use proper LaTeX while others don't

## Solution Overview

I created a Node.js script (`convert-fractions.js`) that automatically converts all fraction formats from `"a/b"` to `"\\frac{a}{b}"` in all JSON files.

## How the Script Works

### 1. **Pattern Recognition**
The script uses a regex pattern to identify fractions:
```javascript
const fractionPattern = /\$([+-]?\d+(?:\/\d+)?)\$/g;
```

This pattern matches:
- `$1/2$` → `$\\frac{1}{2}$`
- `$-3/4$` → `$\\frac{-3}{4}$`
- `$5/10$` → `$\\frac{5}{10}$`

### 2. **Conversion Process**
```javascript
function convertFractions(text) {
  return text.replace(fractionPattern, (match, fraction) => {
    if (fraction.includes('/')) {
      const [numerator, denominator] = fraction.split('/');
      return `$\\frac{${numerator}}{${denominator}}$`;
    }
    return match;
  });
}
```

### 3. **File Processing**
The script processes each JSON file by:
- Reading the file content
- Parsing the JSON structure
- Converting fractions in:
  - Question text
  - Answer choices
  - Correct answers
- Writing the updated content back to the file

## Features

### ✅ **Comprehensive Coverage**
- Processes all JSON files in the `public/data/skills/` directory
- Handles nested directories automatically
- Converts fractions in questions, choices, and answers

### ✅ **Safe Conversion**
- Only converts actual fractions (containing `/`)
- Preserves non-fraction content
- Maintains JSON structure integrity

### ✅ **Detailed Logging**
- Shows which files are being processed
- Reports specific changes made
- Provides summary statistics

### ✅ **Error Handling**
- Graceful error handling for malformed JSON
- Continues processing even if one file fails
- Clear error messages

## Usage

### Running the Script
```bash
node convert-fractions.js
```

### Expected Output
```
🔧 Starting fraction conversion process...
📁 Processing directory: /path/to/public/data/skills

Processing: /path/to/public/data/skills/algebra-basics.json
  Question 1: Updated choice 3
  Question 5: Updated answer
✅ Updated algebra-basics.json with 2 changes

Processing: /path/to/public/data/skills/mixed-conversion.json
  Question 3: Updated question
  Question 7: Updated choice 1
✅ Updated mixed-conversion.json with 2 changes

🎉 Conversion process completed!
📊 Total changes made: 4
✅ All fractions have been converted from "a/b" format to "\\frac{a}{b}" LaTeX format
```

## Examples of Conversions

### Before (Incorrect Format)
```json
{
  "question": "What is $1/2$ as a decimal?",
  "choices": ["$0.5$", "$0.25$", "$1/4$", "$2/4$"],
  "answer": "$1/2$"
}
```

### After (Correct LaTeX Format)
```json
{
  "question": "What is $\\frac{1}{2}$ as a decimal?",
  "choices": ["$0.5$", "$0.25$", "$\\frac{1}{4}$", "$\\frac{2}{4}$"],
  "answer": "$\\frac{1}{2}$"
}
```

## Technical Details

### Regex Pattern Explanation
```javascript
/\$([+-]?\d+(?:\/\d+)?)\$/g
```

- `\$` - Matches literal dollar signs
- `([+-]?\d+(?:\/\d+)?)` - Captures the fraction content:
  - `[+-]?` - Optional plus or minus sign
  - `\d+` - One or more digits
  - `(?:\/\d+)?` - Optional slash followed by digits
- `\$` - Matches closing dollar sign
- `g` - Global flag for multiple matches

### File Structure Handling
The script recursively processes directories:
```javascript
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (file.endsWith('.json')) {
      // Process JSON files
      processJsonFile(filePath);
    }
  });
}
```

## Benefits

### 🎯 **Improved Rendering**
- Fractions now display properly with LaTeX
- Consistent mathematical notation
- Better visual presentation

### 🎯 **Maintainability**
- Single script handles all conversions
- Can be run multiple times safely
- Easy to modify for future needs

### 🎯 **Reliability**
- Comprehensive error handling
- Detailed logging for debugging
- Preserves data integrity

## Future Enhancements

### Potential Improvements
1. **Backup Creation**: Create backups before conversion
2. **Validation**: Add LaTeX syntax validation
3. **Preview Mode**: Show changes without applying them
4. **Selective Processing**: Process only specific files or patterns

### Additional Features
1. **Reverse Conversion**: Convert from LaTeX back to simple format
2. **Batch Processing**: Process multiple directories
3. **Configuration**: Configurable patterns and formats

## Troubleshooting

### Common Issues
1. **File Not Found**: Ensure the script is run from the project root
2. **Permission Errors**: Check file write permissions
3. **Malformed JSON**: The script will skip files with JSON errors

### Debugging
- Check the console output for detailed logs
- Verify file paths are correct
- Ensure JSON files are valid before running

## Conclusion

This solution provides a robust, automated way to convert fraction formats in JSON files. The script is:
- **Safe**: Only converts actual fractions
- **Comprehensive**: Processes all relevant files
- **Reliable**: Handles errors gracefully
- **Maintainable**: Well-documented and modular

The converted fractions will now render properly in the Math Questions Bank application, providing a better user experience for both teachers and students. 