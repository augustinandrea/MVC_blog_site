const { User } = require('../models');

const userData = [
    {
        username: "andy_a",
        password: "p@ssword1"
    },
    {
        username: "matt_b",
        password: "p@ssword2"
    },
    {
        username: "lee_n",
        password: "p@ssword3"
    },
    {
        username: "jyuto",
        password: "p@ssword4"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;