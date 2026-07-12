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
        forbidden: 'You cannot edit or delete another user',
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
      },
    },
    tasks: {
      fields: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        labels: 'Labels',
        label: 'Label',
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
      },
    },
    views: {
      welcome: {
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
          filters: {
            status: 'Status',
            executor: 'Executor',
            label: 'Label',
            is_creator_user: 'Show only mine',
          },
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
          action: 'Login',
        },
      },
    },
    actions: {
      sign_in: 'Sign in',
      sign_up: 'Sign up',
      sign_out: 'Sign out',
      create: 'Create',
      save: 'Save',
      show: 'Show',
      edit: 'Edit',
      delete: 'Delete',
    },
    messages: {
      auth_error: 'Access denied! Please login',
    },
  },
};
