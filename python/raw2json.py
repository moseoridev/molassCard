import json

f = open('python/raw.txt', 'r', encoding='UTF-8')

voca = dict()
vocalist = list()

for l in f.readlines():
    l = l.replace('≅', '').strip()
    t = l.split('`')
    n = t[0].strip()
    try:
        s = t[1].strip()
    except:
        print(t)
        exit()
    if not n in voca:
        voca[n] = s
    else:
        voca[n] += (', ' + s)

for v in voca:
    vocalist.append([v, voca[v]])
f.close()

with open('assets/json/voca.json', 'w', encoding='UTF-8') as f:
    json.dump(vocalist, f, ensure_ascii=False)
