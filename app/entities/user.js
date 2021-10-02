var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "user",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }, 
        email: {
            type: "varchar"
        }, 
        interests: {
            type: "varchar"
        }
    }
});