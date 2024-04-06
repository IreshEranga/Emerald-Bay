import axios from 'axios';


const VIPRoomAPI = {
  // Function to fetch the count of VIP room reservations
  getCount: async () => {
    try {
      const response = await axios.get('/api/vipRoomReservations/count');
      return response.data.count;
    } catch (error) {
      // Handle error
      throw new Error('Error fetching VIP room reservation count');
    }
  }
};

export default VIPRoomAPI;