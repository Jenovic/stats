module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses', {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });

    // Initially insert user for simplicity
    await queryInterface.bulkInsert('courses', [
      {
        uuid: '9704b1ad-b3ae-432f-a64a-92c29ccd6a90',
        name: 'courseOne',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('courses');
  },
};
