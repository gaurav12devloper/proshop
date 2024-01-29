import bcrypt from 'bcryptjs';

const users = [
    {
        name:'Admin Users',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
    {
        name:'John Doe',
        email: 'jone@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false,
    }
];

export default users;