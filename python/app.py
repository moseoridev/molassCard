import random
import json
import os

with open(os.path.join(os.path.dirname(__file__), os.pardir, 'voca.json')) as data_file:
    voca_list = json.load(data_file)


def ask(p):
    random.shuffle(voca_list)
    for v in voca_list:
        vi = input('\n' + v[p-1] + ': ')
        if vi == v[2-p]:
            print('맞았어요!')
        else:
            print(f'틀렸습니다! 답은 {v[2-p]}입니다.')


ui = 0
while ui != 3:
    print('molassCard에 오신 것을 환영합니다.\n\n1. 한국어 뜻 연습\n2. 스펠링 연습\n3. 종료\n')
    ui = int(input('모드 선택: '))
    if ui in (1, 2):
        ask(ui)
        break

print('\n이용해 주셔서 감사합니다.')
