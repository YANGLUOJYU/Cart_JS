import axios from 'axios'

export const listAnimal = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/animal');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching animal data:', error);
    }
};
export const listFeed = async () => {
  try {
      const response = await axios.get('http://localhost:8080/api/feed');
      return response.data;
  } catch (error) {
      throw new Error('Error fetching animal data:', error);
  }
};
export const listPetBox = async () => {
  try {
      const response = await axios.get('http://localhost:8080/api/petbox');
      return response.data;
  } catch (error) {
      throw new Error('Error fetching animal data:', error);
  }
};
//================================================================================
export const listCarts = (uid) => {
    return axios.get("http://localhost:8080/api/cart/"+uid);
  };
  export const createCart = (id, cart) => {
    return axios.post(`http://localhost:8080/api/add_cart/${id}`, cart);
  };
  export const updateCart = (id, cart) => {
    return axios.put("http://localhost:8080/api/update_cart/" + id, cart);
  };
  export const deleteCart = (id) => {
    return axios.delete(`http://localhost:8080/api/delete_cart/${id}`);
  };
  export const deleteAllCart = (del) => {
    return axios.delete("http://localhost:8080/api/delete_allcart", {
      data: del,
    });
  };
//================================================================================
export const listBuys = (uid) => {
    return axios.get("http://localhost:8080/api/buys/"+uid);
  };
  export const createBuy = (pay) => {
    return axios.post("http://localhost:8080/api/add_buy", pay);
  };
  export const deleteBuy = (id) => {
    return axios.delete("http://localhost:8080/api/delete_buy/" + id);
  };
  export const deleteAllBuy = () => {
    return axios.delete("http://localhost:8080/api/deleteAllbuy");
  };
//================================================================================
export const listOrders = (uid) => {
    return axios.get("http://localhost:8080/api/order/"+uid);
  };
  export const listOrdersById = (uid) => {
    return axios.get("http://localhost:8080/api/orders/" + uid);
  };
  export const createOrder = (order) => {
    return axios.post("http://localhost:8080/api/add_order", order);
  };
//================================================================================

// export const createCart = async (cart) => {
//     try {
//         const response = await axios.post('http://localhost:8080/cart/add', JSON.stringify(cart),{
//             headers: {
//               'Content-Type': 'application/json;charset=UTF-8',
//             },
//           });
//         return response.data
//     } catch (error) {
//         alert(error);
//     }
// }
// export const listOrder =async()=>{
//     try {
//         const response = await axios.get('http://localhost:8080/productcart/order');
//         return response.data;
//     } catch (error) {
//         throw new Error('Error fetching animal data:', error);
//     }
// }
// export const listUserData =async()=>{
//     try {
//         const response = await axios.get('http://localhost:8080/data');
//         return response.data;
//     } catch (error) {
//         throw new Error('Error fetching animal data:', error);
//     }
// }
