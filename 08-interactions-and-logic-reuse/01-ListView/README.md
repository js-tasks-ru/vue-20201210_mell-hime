# ListView

👶🏻 _Несложная задача_<br>
⭐ _Дополнительная задача_

Разработанный ранее компонент `MeetupsList` выводил список митапов в виде списка карточек. Всё это было жёстко зашито в реализацию компонента `MeetupsList` и `MeetupsListItem`.

Теперь предлагается разбить его на множество более универсальных компонентов:
1. `ListView` — универсальный компонент вывода массива данных;
2. `ListViewCard` — универсальный компонент, который выводит карточку;
3. `MeetupInfo` — компонент, выводящий основную информацию о митапе (разработан вами ранее в другой задаче);
4. `MeetupsList` — компонент, который выводит список митапов с помощью вышеописанных компонентов.

Компоненты `ListViewCard` и `MeetupInfo`, а также частично `MeetupsList` уже реализованы.

Требуется реализовать универсальный компонент вывода списка данных `ListView`.
- Единственный входной параметр `items` — массив исходных данных;
- Сам компонент не определяет, как именно выводятся данные, а предоставляет `scoped-slot` по умолчанию **для каждого** элемента массива данных. Пользователь компонента через этот слот определяет, как рендерится элемент списка;
- Параметры слота вам требуется выбрать самостоятельно.

`ListView` - это универсальный компонент для вывода массива данных. В этой задаче компонент очень простой и можно сказать практически ничего не делает. Эта задача — простой пример, на котором требуется вспомнить, как использовать `scoped-slots`. В более сложном проекте у компонента могут появиться новые задачи. Например, он может заниматься пагинацией данных, загрузкой данных. Или иметь какие-то возможности, связанные с UI, например, заниматься отступом между элементами, или выводить данные сеткой, оставляя на ответственности пользователя только рендеринг непосредственно элемента списка.

Когда компонент будет реализован, обновите его использование в `MeetupsList`.

*Примечание: компонент не может сам установить `key` на элементы списка, так как для этого требуется самостоятельно рендерить как минимум корневой элемент списка, а также знать, как получить ключ из элемента данных (может там нет поля `id` или это вообще будет не объект); задача установки ключа — на том, кто будет пользоваться компонентом.*

<img src="https://i.imgur.com/4p0XCE3.png" alt="Example" />

---

### Инструкция

📝 Для решения задачи отредактируйте файлы: `components/ListView.vue`, `components/MeetupsList.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;<br>
приложение будет доступно на [http://localhost:8080/08-interactions-and-logic-reuse/01-ListView/](http://localhost:8080/08-interactions-and-logic-reuse/01-ListView/).

✅ Доступно автоматическое тестирование: `npm test ListView`.
