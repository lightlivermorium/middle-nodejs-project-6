export default {
  translation: {
    app_name: 'Менеджер задач',
    app_title: 'Hexlet Task Manager',
    common: {
      actions: 'Действия',
    },
    session: {
      create: {
        success: 'Вы залогинены',
        error: 'Неправильный емейл или пароль',
      },
      delete: {
        success: 'Вы разлогинены',
      },
    },
    users: {
      fields: {
        id: 'ID',
        full_name: 'Полное имя',
        first_name: 'Имя',
        last_name: 'Фамилия',
        email: 'Email',
        password: 'Пароль',
        created_at: 'Дата создания',
      },
      create: {
        error: 'Не удалось зарегистрировать',
        success: 'Пользователь успешно зарегистрирован',
      },
      update: {
        error: 'Не удалось изменить пользователя',
        success: 'Пользователь успешно изменён',
      },
      delete: {
        error: 'Не удалось удалить пользователя',
        success: 'Пользователь успешно удален',
      },
      manage: {
        forbidden:
          'Вы не можете редактировать или удалять другого пользователя',
      },
    },
    statuses: {
      fields: {
        id: 'ID',
        name: 'Наименование',
        created_at: 'Дата создания',
      },
      create: {
        error: 'Не удалось создать статус',
        success: 'Статус успешно создан',
      },
      update: {
        error: 'Не удалось изменить статус',
        success: 'Статус успешно изменён',
      },
      delete: {
        error: 'Не удалось удалить статус',
        success: 'Статус успешно удалён',
      },
    },
    labels: {
      fields: {
        id: 'ID',
        name: 'Наименование',
        created_at: 'Дата создания',
      },
      create: {
        error: 'Не удалось создать метку',
        success: 'Метка успешно создана',
      },
      update: {
        error: 'Не удалось изменить метку',
        success: 'Метка успешно изменёна',
      },
      delete: {
        error: 'Не удалось удалить метку',
        success: 'Метка успешно удалёна',
      },
    },
    tasks: {
      fields: {
        id: 'ID',
        name: 'Наименование',
        description: 'Описание',
        status: 'Статус',
        labels: 'Метки',
        label: 'Метка',
        creator: 'Автор',
        executor: 'Исполнитель',
        created_at: 'Дата создания',
      },
      create: {
        error: 'Не удалось создать задачу',
        success: 'Задача успешно создана',
      },
      update: {
        error: 'Не удалось изменить задачу',
        success: 'Задача успешно изменёна',
      },
      delete: {
        error: 'Не удалось удалить задачу',
        success: 'Задача успешно удалёна',
      },
    },
    views: {
      welcome: {
        hello: 'Привет от Хекслета!',
        description: 'Практические курсы по программированию',
        more: 'Узнать Больше',
      },
      users: {
        index: {
          title: 'Пользователи',
        },
        new: {
          title: 'Регистрация',
        },
        edit: {
          title: 'Изменение пользователя',
        },
      },
      statuses: {
        index: {
          title: 'Статусы',
          new: 'Создать статус',
        },
        new: {
          title: 'Создание статуса',
        },
        edit: {
          title: 'Изменение статуса',
        },
      },
      labels: {
        index: {
          title: 'Метки',
          new: 'Создать метку',
        },
        new: {
          title: 'Создание метки',
        },
        edit: {
          title: 'Изменение метки',
        },
      },
      tasks: {
        index: {
          title: 'Задачи',
          new: 'Создать задачу',
          filters: {
            status: 'Статус',
            executor: 'Исполнитель',
            label: 'Метка',
            is_creator_user: 'Только мои задачи',
          },
        },
        new: {
          title: 'Создание задачи',
        },
        edit: {
          title: 'Изменение задачи',
        },
      },
      session: {
        new: {
          title: 'Вход',
          action: 'Войти',
        },
      },
    },
    actions: {
      sign_in: 'Вход',
      sign_up: 'Регистрация',
      sign_out: 'Выход',
      create: 'Создать',
      save: 'Сохранить',
      show: 'Показать',
      edit: 'Изменить',
      delete: 'Удалить',
    },
    messages: {
      auth_error: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
  },
};
