import { useEffect, useState } from 'react';
import { supabase } from '../client/Client';

const useHandList = () => {
  const [list, setList] = useState([]);

  // 1. 初始抓取資料
  const fetchList = async () => {
    const { data } = await supabase
      .from('hand_raises')
      .select('*')
      .order('created_at', { ascending: false });
    setList(data || []);
  };

  useEffect(() => {
    fetchList();

    // 2. 訂閱 Realtime 變更
    const channel = supabase
      .channel('hands-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'hand_raises' }, 
        (payload) => {
          // 當資料有增刪時，重新抓取或更新狀態
          fetchList(); 
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // 封裝「舉手」功能
  const raiseHand = async (username) => {
    await supabase.from('hand_raises').insert([{ username }]);
  };

  // 封裝「清空」功能
  const clearAll = async () => {
    await supabase.from('hand_raises').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  };

  return {list,raiseHand,clearAll};
}
export default useHandList;