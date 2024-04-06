import { useQuery } from 'react-query';
import axios from 'axios';


export const useVIPRoomReservationCount = () => {
    return useQuery('vipRoomReservationCount', async () => {
        const { data } = await axios.get('/api/vipRoomReservations/count');
        return data.count;
    });
};