import mutations from './mutations'
import actions from './actions'
import getters from './getters'


export default {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            devs: [
                {
                    id: 'd1',
                    firstName: 'Justin',
                    lastName: 'Moreyl',
                    areas: ['frontend', 'backend'],
                    description:
                        "I'm Justin and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                    hourlyRate: 30
                },
                {
                    id: 'd2',
                    firstName: 'Olga',
                    lastName: 'Moreyl',
                    areas: ['frontend', 'fullstack'],
                    description:
                        'I am Olga and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                    hourlyRate: 30
                }
            ]
        }
    },
    mutations,
    actions,
    getters
}