```sql
SHOW VARIABLES LIKE 'datadir';
```
---
Mandatory Part (V)  
  
"you will create a function calling tool that translates natural language prompts into structured function calls"_using the llm_sdk_
"your solution should not return 42, but instead provide: The function name / The arguments"  
"Your implementation must use constrained decoding to guarantee 100% valid JSON output"  
"You must implement proper JSON error handling for input files, as they may contain invalid JSON or be missing entirely."  
"Your solution must NOT rely on the model spontaneously producing correct JSON from a prompt."  
"Think about how you can use the vocabulary JSON file to map between tokens and their string representations."  
"Your program will produce a single JSON file: data/output/function_calling_results.json"  
"Do not hardcode solutions based on the provided examples."  
  
Output Validation Rules (V.4.2)  
  
"The file must be valid JSON (no trailing commas, no comments)"  
"Keys and types must match the schema in function_definitions.json exactly"  
"No extra keys or prose are allowed anywhere in the output"  
"All required arguments must be present"  
"Argument types must match the function definition (number, string, boolean, etc.)"  
  
Performance (V.5)  
  
"Near-perfect accuracy: 90%+ correct function selection and argument extraction"  
"100% valid JSON: Every output must be parseable and schema-compliant"  
"Reasonable speed: Process all test prompts in under 5 minutes on standard hardware"  
"Robust error handling: Gracefully handle malformed inputs, missing files, and edge cases"  
"Test with various edge cases: empty strings, large numbers, special characters, wrong types, ambiguous prompts, and functions with multiple parameters."