***parameter***: like a adjustable buttons to controle a model
Each parameter helps the model decide:
- which word comes next
- how to understand a sentence
- how to respond correctly
**<span style="color:rgb(255, 192, 0)">More parameters means more knowledge, Deep understanding</span>


---
## hadra khasha tweli clear 
### The Core Technical Challenge: Constrained Decoding

This is the entire soul of the project. Here's what it means in practice:

The LLM generates text **one token at a time**. At each step it outputs logits (raw scores) over its entire vocabulary (~150k tokens). Normally you'd just pick the highest score. But a tiny model will often pick garbage that breaks JSON structure.
Constrained decoding = you intervene at each step to set invalid tokens to `-inf` before sampling.
The hard part is `compute_valid_tokens`

---
### file hindling using try/except
```python
try:
    with open(path, "r") as f:
        data = f.read()
except FileNotFoundError:
    print("Input file not found")
```

### JSON parsing
```python
import json

try:
    parsed = json.loads(data)
except json.JSONDecodeError:
    print("Invalid JSON format")
```
### Structure validation (THIS is what many forget)
json file
```json
{ "wrong_key": 123 }
```

**so you must check**
```python
if not isinstance(parsed, list):
    print("Expected a list of prompts")
```
and 
```python
for item in parsed:
    if "prompt" not in item:
        print("Missing 'prompt' field")
```
Most beginners stop at:
 try/except
But the project expects:
> ✔ try/except  
> ✔ structure validation  
> ✔ graceful behavior

>[danger] !search abouth invalid json and handle them.

---
# LLM Production pipline 
_**LLMs takes some text as input, analyzes it and predicts a next word that makes sense.**_
### I. PRETRAININ 
1)Crawl huge text data from the internet and filter it based on language web source validity ...
2)_<span style="color:rgb(255, 192, 0)">tokenization:</span> convert text <----> sequences of symbols (\tokens)_
<strong><span style="color:rgb(0, 176, 80)">Token</span></strong> s

predincting next word: actually, llms don't just predict a single word--they have a list of all possible words, letters, characters... they can choose from, and for each word, they calculate the probablity that it is the next word based on context.
<u><strong>What means make sens </strong></u>? :

