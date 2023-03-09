export default {
    async registerDevs(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        const token = context.rootGetters.token;

        const response = await fetch(
            `https://vue-app2-af445-default-rtdb.firebaseio.com/devs/${userId}.json?auth=` +
            token,
            {
                method: 'PUT',
                body: JSON.stringify(coachData)
            }
        );

        // const responseData = await response.json();

        if (!response.ok) {
            // error ...
        }

        context.commit('registerDev', {
            ...coachData,
            id: userId
        });
    },


    async loadDevs(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return
        }

        const response = await fetch(
            `https://vue-app2-af445-default-rtdb.firebaseio.com/devs.json`
        );
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const devs = [];

        for (const key in responseData) {
            const dev = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            devs.push(dev);
        }

        context.commit('setDevs', devs);
        context.commit('setFetchTimeStamp');
    }
};