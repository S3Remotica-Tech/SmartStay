import AxiosConfig from "../../WebService/AxiosConfig";


export async function handleSubscription(users) {
    return await AxiosConfig.post('/new_subscription',users,{
      data:users
    })
  }