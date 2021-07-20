module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('study_sessions', {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      userUuid: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid',
        },
      },
      courseUuid: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'uuid',
        },
      },
      totalModulesStudied: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      averageScore: {
        type: Sequelize.FLOAT(4, 2).UNSIGNED,
        allowNull: false,
      },
      timeStudied: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('study_sessions');
  },
};
