import random
from datetime import datetime, timedelta

name = ['Ivan', 'Roman', 'Vladyslav', 'Taras', "Diana", "Olia", "Anastasia"]
message = [
    'Завдяки цьому репетитору я значно покращила оцінки з математики. Дуже терплячий і зрозуміло пояснює складні теми. Рекомендую!',
    'Син із задоволенням відвідує заняття. Бачимо результат вже через місяць. Чудовий підхід до дітей!',
    'Готувалась до НМТ з математики — склала на 190+. Репетитор дав чітку структуру і пояснив нюанси, які не пояснювали в школі.',
    'На уроках цікаво і весело, матеріал подається доступно. Особливо сподобалась індивідуальна увага.',
    'Донька стала впевненіше почувати себе на уроках. Репетитор не просто дає знання, а й мотивує до навчання.',
    'Підготовка до НМТ з математики пройшла ідеально. Завдяки репетитору отримав високий бал і вступив на бюджет.',
    'Вивчаю математику для роботи — результат помітний вже після кількох занять. Дуже професійний і привітний репетитор.'
]


def generate_comment():
    comments = []
    total_rating = 0

    for _ in range(2):
        person = random.choice(name)
        text = random.choice(message)
        days_ago = random.randint(1, 3)
        date = (datetime.now() - timedelta(days=days_ago)).strftime("%Y-%m-%d")
        rating = random.randint(3, 5)
        total_rating += rating

        comments.append({
            "who": person,
            "comment": text,
            "date": date,
            "score": rating
        })

    average_rating = round(total_rating / 2, 1)

    return {
        "comments": comments,
        "avg_score": average_rating
    }
