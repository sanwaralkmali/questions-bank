# Question Management System

This document explains how the question management system works and how to save questions to JSON files.

## How It Works

### 1. Frontend Form

- Users can create questions using the floating "+" button
- The form includes all necessary fields: question text, choices, correct answer, skill, grade, and difficulty level
- LaTeX support is available for mathematical equations

### 2. Question Storage

Questions are stored in JSON files located in `public/data/skills/` directory. Each skill has its own JSON file.

### 3. File Structure

Each skill JSON file follows this structure:

```json
{
  "title": "Skill Name",
  "description": "Skill description",
  "waves": 5,
  "timePerQuestion": 30,
  "questions": [
    {
      "id": 1,
      "wave": 1,
      "question": "What is $x$ in the expression $5x + 2$?",
      "choices": ["Variable", "Constant", "Coefficient", "Term"],
      "answer": "Variable",
      "points": 10
    }
  ]
}
```

## Current Implementation

### Frontend (Current)

- The form collects all question data
- Shows a preview of the question
- Displays file information (target file path, skill, grade, etc.)
- Currently logs the data to console (simulated save)

### Backend Script (Manual)

- Located at `scripts/save-question.js`
- Can be run manually to save questions to JSON files
- Requires Node.js to run

## How to Save Questions

### Option 1: Manual Script (Recommended for Development)

1. Create your question using the form
2. Copy the logged data from the browser console
3. Run the script manually:
   ```bash
   node scripts/save-question.js
   ```

### Option 2: Full Backend Integration (For Production)

To implement automatic saving, you would need to:

1. **Create a backend API** (Node.js/Express, Python/Flask, etc.)
2. **Add file writing endpoints** that use the script logic
3. **Update the frontend** to make actual API calls instead of logging

Example backend endpoint:

```javascript
app.post("/api/questions", (req, res) => {
  const result = saveQuestionToFile(req.body);
  res.json(result);
});
```

## File Locations

- **Skill files**: `public/data/skills/[skill-name].json`
- **Script**: `scripts/save-question.js`
- **Frontend form**: `src/components/AddQuestionForm.tsx`
- **Utilities**: `src/lib/questionUtils.ts`

## Difficulty Level Mapping

- **Easy** → Wave 1
- **Medium** → Wave 2
- **Hard** → Wave 3
- **Expert** → Wave 4

## Adding New Skills

To add a new skill:

1. Create a new JSON file in `public/data/skills/`
2. Add the skill to `public/data/games.json`
3. Follow the existing JSON structure

## Benefits of JSON Files

✅ **Simple and transparent** - you can see exactly what's stored
✅ **Version control friendly** - changes are tracked in git
✅ **Easy to backup** - just copy the files
✅ **No database setup required** - perfect for development
✅ **Manual review possible** - you can check questions before they go live

## Future Enhancements

- **Validation**: Add more robust validation for LaTeX syntax
- **Bulk import**: Import multiple questions at once
- **Question editing**: Edit existing questions
- **Question deletion**: Remove questions from files
- **Backup system**: Automatic backups before changes
- **Database migration**: Move to a proper database when needed

## Troubleshooting

### Common Issues

1. **File not found**: Make sure the skill JSON file exists
2. **Invalid JSON**: Check that the file has valid JSON structure
3. **Permission errors**: Ensure write permissions on the files directory
4. **LaTeX rendering**: Test LaTeX syntax in the preview before saving

### Debug Tips

- Check browser console for logged question data
- Verify file paths are correct
- Test with simple questions first
- Use the preview feature to catch issues early
