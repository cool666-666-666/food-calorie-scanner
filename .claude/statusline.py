import json
import sys
import os

data = json.load(sys.stdin)
model = data.get('model', {}).get('display_name', '') or 'unknown'
current_dir = data.get('workspace', {}).get('current_dir', '')
remaining_pct = data.get('context_window', {}).get('remaining_percentage')
context = f'{remaining_pct}% ctx' if remaining_pct is not None else ''

print(f'{current_dir} | {model} | {context}')
