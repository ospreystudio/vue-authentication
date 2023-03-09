
export default {
   async contactDev(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        const response = await fetch(`https://vue-app2-af445-default-rtdb.firebaseio.com/requests/${payload.devId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json()


       if (!response.ok) {
           const error = new Error(responseData.message || 'Failed to request')
           throw error
       }

       newRequest.id = responseData.name
       newRequest.devId = payload.devId

        context.commit('addRequest', newRequest)
    },

   async fetchRequests(context) {
       const devId = context.rootGetters.userId
       const token = context.rootGetters.token;
       const response = await fetch(`https://vue-app2-af445-default-rtdb.firebaseio.com/requests/${devId}.json?auth=` +
           token
       );
       console.log(token)
       const responseData = await response.json()

       if (!response.ok) {
           const error = new Error(responseData.message || 'Failed to request')
           throw error
       }

       const requests = [];

       for (const key in responseData) {
           const request = {
               id: key,
               devId: devId,
               userEmail: responseData[key].userEmail,
               message: responseData[key].message
           }; requests.push(request)
       } context.commit('setRequest', requests)
    }

}