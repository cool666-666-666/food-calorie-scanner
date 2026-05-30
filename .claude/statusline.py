import json
import sys
import os

data = json.load(sys.stdin)

# DEBUG: 写入文件查看实际数据结构（确认后删除此行）
with open('D:/wechat-project/.claude/statusline_debug.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

model = data.get('model', {}).get('display_name', '') or 'unknown'
current_dir = data.get('workspace', {}).get('current_dir', '')
remaining_pct = data.get('context_window', {}).get('remaining_percentage')
context = f'{remaining_pct}% ctx' if remaining_pct is not None else ''

print(f'{current_dir} | {model} | {context}')
