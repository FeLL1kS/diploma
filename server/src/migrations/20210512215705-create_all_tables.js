'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      }
    });

    await queryInterface.createTable('department', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      departmentName: {
        allowNull: false,
        type: Sequelize.STRING(255)
      }
    });

    await queryInterface.createTable("group", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      course: {
        allowNull: false,
        type: Sequelize.STRING(1)
      },
      group: {
        allowNull: false,
        type: Sequelize.STRING(5)
      },
      departmentId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'department',
          key: 'id'
        },
      }
    });

    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      patronymic: {
        type: Sequelize.STRING(255)
      },
      dateBirth: {
        type: Sequelize.DATE
      },
      placeWork: {
        type: Sequelize.STRING(255)
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      mail: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      aboutMe: {
        type: Sequelize.TEXT
      },
      departmentId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'department',
          key: 'id'
        },
      },
      roleId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'role',
          key: 'id'
        },
      }
    });

    await queryInterface.createTable("project", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      dateBegin: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dateEnd: {
        allowNull: false,
        type: Sequelize.DATE
      },
      controlPoints: {
        type: Sequelize.TEXT
      },
      result: {
        type: Sequelize.TEXT
      }
    });

    await queryInterface.createTable("project_user", {
      projectId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'project',
          key: 'id'
        },
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'id'
        },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('project_user');
    await queryInterface.dropTable('project');
    await queryInterface.dropTable('user');
    await queryInterface.dropTable('group');
    await queryInterface.dropTable('department');
    await queryInterface.dropTable('role');
  }
};
