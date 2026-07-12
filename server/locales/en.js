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
          'Вы не можете редактировать или удалять другого пользователя\n',
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
        error: 'Failed to update',
        success: 'Status updated successfully',
      },
      delete: {
        error: 'Failed to delete status',
        success: 'Status deleted successfully',
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
        },
        new: {
          title: 'New label',
        },
      },
      tasks: {
        index: {
          title: 'Tasks',
        },
        new: {
          title: 'New task',
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
