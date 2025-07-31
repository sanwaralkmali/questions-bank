# Interactive LaTeX Copy Feature

## Overview

The questions bank now includes an **interactive LaTeX copy feature** that allows users to copy individual mathematical expressions by hovering over them. This feature is perfect for teachers and content creators who want to copy specific equations and paste them as proper equations in Word or other applications.

## How It Works

### Interactive LaTeX Expressions

- **Hover over any LaTeX expression** in questions or answer choices
- **Visual highlight** appears with a blue overlay
- **Copy button** appears in the center of the expression
- **Click to copy** the specific equation
- **Paste in Word** to insert as a proper equation

### Supported LaTeX Formats

The feature works with all LaTeX expressions:

- **Inline math**: `$expression$` or `\(expression\)`
- **Block math**: `\[expression\]`

## User Experience

### Copying Process

1. **Hover over any mathematical expression** in the question or choices
2. **Blue highlight appears** around the equation
3. **Click the copy button** that appears in the center
4. **Success notification** confirms the equation was copied
5. **Paste in Word** to insert as a proper equation

### Visual Feedback

- **Hover effect**: Blue overlay with border
- **Copy button**: Appears in center with copy icon
- **Success state**: Button shows checkmark for 2 seconds
- **Tooltip**: "Click to copy equation" appears on hover

## Technical Implementation

### InteractiveLatex Component

```typescript
const InteractiveLatex: React.FC<InteractiveLatexProps> = ({
  math,
  isBlock = false,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Hover and copy functionality
};
```

### Word-Compatible Formatting

```typescript
// Function to copy LaTeX expression with proper formatting for Word
export const copyLatexForWord = async (
  latexExpression: string
): Promise<boolean> => {
  // Format the LaTeX for Word compatibility
  const wordFormattedLatex = `$${latexExpression}$`;
  // Copy with success notification
};
```

## Example Usage

### Question with Interactive LaTeX

```
Question: "What is the value of [hoverable] $x$ [/hoverable] in the equation [hoverable] $2x + 3 = 7$ [/hoverable]?"
Choices:
A) [hoverable] $x = 2$ [/hoverable]
B) [hoverable] $x = 3$ [/hoverable]
C) [hoverable] $x = 4$ [/hoverable]
D) [hoverable] $x = 5$ [/hoverable]
```

### Copying Individual Expressions

- **Hover over** `$x$` → Copy just the variable
- **Hover over** `$2x + 3 = 7$` → Copy the equation
- **Hover over** `$x = 2$` → Copy the solution

### Pasting in Word

When you paste in Microsoft Word:

1. **Copy equation** by hovering and clicking
2. **In Word**: Go to Insert > Equation
3. **Paste** the copied equation
4. **Word converts**: To proper equation format
5. **Result**: Professional-looking equation in your document

**Alternative method**: Paste directly and use Word's "Convert to Equation" option

## Benefits

### For Teachers

- **Selective copying**: Copy only the specific equation you need
- **Word integration**: Paste directly as equations in Word
- **Time saving**: No need to retype complex mathematical expressions
- **Precision**: Copy exactly what you need, nothing more

### For Content Creators

- **Individual equations**: Copy specific parts of questions
- **Professional output**: Equations paste as proper math in Word
- **Flexibility**: Mix and match equations from different questions
- **Quality control**: Copy verified, correct mathematical expressions

### For Students

- **Study materials**: Copy specific equations for notes
- **Practice problems**: Extract individual equations for practice
- **Reference**: Build a library of specific mathematical expressions

## Browser Compatibility

The interactive feature works in all modern browsers:

- ✅ **Chrome**: Full support with hover effects
- ✅ **Firefox**: Full support with hover effects
- ✅ **Safari**: Full support with hover effects
- ✅ **Edge**: Full support with hover effects

## Word Integration

### How to Use in Microsoft Word

1. **Copy equation** by hovering and clicking
2. **Open Word** and go to Insert > Equation
3. **Paste** the copied equation (Ctrl+V or Cmd+V)
4. **Word converts** the text to proper equation format
5. **Edit if needed** using Word's equation editor

**Alternative**: Paste directly and right-click > "Convert to Equation"

### Supported Word Versions

- ✅ **Word 2016+**: Full equation support
- ✅ **Word Online**: Basic equation support
- ✅ **Word for Mac**: Full equation support

## Future Enhancements

- **Equation editor**: Built-in equation editing before copying
- **Format options**: Choose between LaTeX, MathML, or plain text
- **Batch copying**: Select multiple equations at once
- **Custom formatting**: Choose equation style and size
- **Export options**: Direct export to PDF with equations
