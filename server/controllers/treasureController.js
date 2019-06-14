module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db')
        let treasure = await db.get_dragon_treasure(1)
        res.status(200).send(treasure)
    },

    gerUserTreasure: async (req, res) => {
        const db = req.app.get('db')
        let treasure = await db.get_user_treasure([req.session.user.id])
        res.status(200).send(treasure)
    },

    addUserTreasure: async (req, res) => {
        const { treasureURL } = req.body
        const { id } = req.session.user
        let db = req.app.get('db')

        let userTreasure = await db.add_user_treasure([treasureURL, id])
        res.statsu(200).send(userTreasure)
    },

    getAllTreasure: async (req, res) => {
        let db = req.app.get('db')
        const allTreasure = await db.get_all_treasure()
        res.status(200).send(allTreasure)
    }
}