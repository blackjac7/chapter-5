"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        // add deletedAt column in classes table
        await queryInterface.addColumn("classes", "deletedAt", {
            allowNull: true,
            type: Sequelize.DATE,
        });
        // add deletedAt column in students table
        await queryInterface.addColumn("students", "deletedAt", {
            allowNull: true,
            type: Sequelize.DATE,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn("classes", "deletedAt");
        await queryInterface.removeColumn("students", "deletedAt");
    },
};
