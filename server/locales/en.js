export default {
  translation: {
    app_name: 'Task Manager',
    app_title: 'Hexlet Task Manager',
    common: {
      actions: 'Actions',
    },
    session: {
      create: {
        success: 'You are logged in',
        error: 'Wrong email or password',
      },
      delete: {
        success: 'You are logged out',
      },
    },
    users: {
      fields: {
        id: 'ID',
        full_name: 'Full Name',
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'Email',
        password: 'Password',
        created_at: 'Created at',
        updated_at: 'Updated at',
      },
      create: {
        error: 'Failed to register',
        success: 'User registered successfully',
      },
      update: {
        error: 'Failed to update',
        success: 'User updated successfully',
      },
      delete: {
        error: 'Failed to delete user',
        success: 'User deleted successfully',
      },
      manage: {
        forbidden:
          'Вы не можете редактировать или удалять другого пользователя',
      },
    },
    statuses: {
      fields: {
        id: 'ID',
        name: 'Name',
        created_at: 'Created at',
      },
      create: {
        error: 'Failed to create status',
        success: 'Status successfully created',
      },
      update: {
        error: 'Failed to update status',
        success: 'Status updated successfully',
      },
      delete: {
        error: 'Failed to delete status',
        success: 'Status deleted successfully',
        forbidden: 'You can not delete the status',
      },
    },
    labels: {
      fields: {
        id: 'ID',
        name: 'Name',
        created_at: 'Created at',
      },
      create: {
        error: 'Failed to create label',
        success: 'Label successfully created',
      },
      update: {
        error: 'Failed to update label',
        success: 'Label updated successfully',
      },
      delete: {
        error: 'Failed to delete label',
        success: 'Label deleted successfully',
        forbidden: 'You can not delete the label',
      },
    },
    tasks: {
      fields: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        labels: 'Labels',
        creator: 'Creator',
        executor: 'Executor',
        created_at: 'Created at',
      },
      create: {
        error: 'Failed to create task',
        success: 'Task successfully created',
      },
      update: {
        error: 'Failed to update task',
        success: 'Task updated successfully',
      },
      delete: {
        error: 'Failed to delete task',
        success: 'Task deleted successfully',
        forbidden: 'You can not delete the task',
      },
    },
    views: {
      welcome: {
        title: 'Organize Your Work',
        hello: 'Hello from Hexlet!',
        description: 'Online programming school',
        more: 'Learn more',
      },
      users: {
        index: {
          title: 'Users',
        },
        new: {
          title: 'New user',
        },
        edit: {
          title: 'Edit user',
        },
      },
      statuses: {
        index: {
          title: 'Statuses',
          new: 'Create status',
        },
        new: {
          title: 'Status creation',
        },
        edit: {
          title: 'Edit status',
        },
      },
      labels: {
        index: {
          title: 'Labels',
          new: 'Create label',
        },
        new: {
          title: 'New label',
        },
        edit: {
          title: 'Edit label',
        },
      },
      tasks: {
        index: {
          title: 'Tasks',
          new: 'Create task',
        },
        new: {
          title: 'New task',
        },
        edit: {
          title: 'Edit task',
        },
      },
      session: {
        new: {
          title: 'Sign in',
        },
      },
    },
    actions: {
      sign_in: 'Sign in',
      sign_up: 'Sign up',
      sign_out: 'Sign out',
      create: 'Create',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
    },
    messages: {
      validation: 'Please check the form and fix the highlighted fields.',
      created: '{{ resource }} created successfully.',
      updated: '{{ resource }} updated successfully.',
      deleted: '{{ resource }} deleted successfully.',
      auth_error: 'Access denied! Please login',
      delete_confirm: 'Are you sure you want to delete?',
    },
    validation: {
      required: '{{ field }} is required.',
      minLength: '{{ field }} must be at least {{ min }} characters long.',
      maxLength: '{{ field }} must be no more than {{ max }} characters long.',
      email: '{{ field }} must be a valid email address.',
    },
  },
};
