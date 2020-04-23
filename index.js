const app = require('./app');
const sequelize = require('./utils/database')
const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await sequelize.sync()
        app.listen(PORT, () => console.log('Server started'))
    } catch (error) {
        console.log(error);
    }
}
start()


