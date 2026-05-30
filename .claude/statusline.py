import json
import sys

data = json.load(sys.stdin)
model = data.get('model', {}).get('display_name', '') or 'unknown'
cost = data.get('cost', {})
total_cost = cost.get('total_cost_usd', 0)
cost_str = f'${total_cost:.4f}' if total_cost else ''
print(f'{model} | {cost_str}')
