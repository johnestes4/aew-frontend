export class Wrestler {
    _id: string
    name: string
    img: string
    nickname: string
    male: boolean
    power: Number
    moves: [any]
    team: string
    faction: string
    titles: []
    record: []

    constructor() {
        this._id = '0'
        this.name = ''
        this.img = ''
        this.nickname = ''
        this.male = true
        this.power = 0
        this.moves = ['']
        this.team = ''
        this.faction = ''
        this.titles = []
        this.record = []
    }
}