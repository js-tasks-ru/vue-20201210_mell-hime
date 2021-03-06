# AppCheckbox

👷🏻 _Задача нормальной сложности_<br>
💼 _Часть проекта_

Требуется реализовать компонент `AppCheckbox`, который реализует обёртку над стандартным `input[type=checkbox]`:
- Компонент выводит блок `<label class="chekbox">` со стандартным чекбоксом `input[type=checkbox]` и содержимым после него;
- Содержимое в `label` передаётся через слот по умолчанию;
- Компонент имеет модель, которая позволяет использовать `AppCheckbox`, как в модель в `input[type=checkbox]`.

Стандартный `checkbox` во Vue может работать с разными типами значений. Он может быть как простым `boolean`, так и массивом выбранных элементов для нескольких `checkbox`, тогда передаётся список значений атрибута `value` выбранных полей. Такое поведение реализует сам Vue.js при работе через `v-model` на `checkbox`.<br>
Исходник `v-model` для web платформы может помочь лучше разобраться, как checkbox работает во Vue: [https://github.com/vuejs/vue/blob/2.6/src/platforms/web/compiler/directives/model.js#L67](https://github.com/vuejs/vue/blob/2.6/src/platforms/web/compiler/directives/model.js#L67).

Можно самостоятельно реализовать такую же логику, но придётся разбирать разные случаи. Было бы чище и проще, если бы мы могли просто передать значение сразу в `v-model`, сделав компонент совсем прозрачным, реализовав прозрачный `v-model`. 

Подсказки:
- Реализовать "прозрачный" `v-model` можно, используя вычисляемое свойство с геттером и сеттером;
- `value` должно быть передано на `input` как `domProps`, чтобы корректно работал `v-model`. По этой причине он не сработает, если будет передан, как `v-bind="$attrs"` с атрибутами.

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `components/AppCheckbox.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;<br>
приложение будет доступно на [http://localhost:8080/06-deep-vue/09-AppCheckbox](http://localhost:8080/06-deep-vue/09-AppCheckbox).

✅ Доступно автоматическое тестирование: `npm test AppCheckbox`.
