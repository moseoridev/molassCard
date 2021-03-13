import json

f = open('raw.txt', 'r', encoding='UTF-8')

voca = dict()
vocalist = list()

for l in f.readlines():
    l = l.replace('≅', '').strip()
    t = l.split('`')
    n = t[0].strip()
    s = t[1].strip()
    if not n in voca:
        voca[n] = s
    else:
        voca[n] += (' ' + s)

for v in voca:
    vocalist.append([v, voca[v]])
f.close()

with open('voca.json', 'w', encoding='UTF-8') as f:
    json.dump(vocalist, f, ensure_ascii=False)
