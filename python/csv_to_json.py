import json


J = list()
csv = open("voca.csv", "r")

for line in csv.readlines():
    a = line.split(",")
    _t = [a[0], a[1].replace("\n", "").replace("\r", "")]
    J.append(_t)

with open('voca.json', 'w', encoding='UTF-8') as f:
    json.dump(J, f, ensure_ascii=False)
