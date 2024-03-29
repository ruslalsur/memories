# Воспоминания

Воспоминания привязаны к пользователям и состоят из названия, описания и картинки.

На главной странице, через некоторый интервал времени, показыаются, случайным образом выбранные, воспоминания пользователей из набора доступных для всеобщего просмотра. Нажав на отображаемое воспоминание можно будет увидеть остальные, разрешенные для просмотра, воспоминания пользователя, которому оно принадлежит.

На графике показана активность того пользователя с начала текущего года, чье воспомининие отображается в данный момент.

Для воспоминаний реализованы:

- **CRUD-операции**, доступные после авторизации;
- **мгновенный поиск** по подстроке входящей либо в его название, либо в описание;
- **приватные воспоминания** помечены иконкой с изображением красного замочка и отображаются только у пользователя которому они принадлежат

В личном кабинете реализованы следующие возможности:

- **статистика** по количеству и приватности воспоминаний у авторизованного в данный момент пользователя;
- возможность для **смены аватара** (пользователи с ролью _PHOTO_ имеют возможность загружать картинки большего размера, при создании и изменении воспоминаний);
- предоставления информации об адресе электронной почты и **отправка ему письма** с благодарностью за использования этой возможности.

На данный момент еще **не реализовано**:

- crud для пользователей с назначением ролей;
- добавление статистической информации в письмо пользователю с данными из личного кабинета
- возможность выбора года для отображения графика за прошлый год (пока реализована только автоматическое определение диапазона месяцев, если запрашиваемый период совпадает с текущим годом)
