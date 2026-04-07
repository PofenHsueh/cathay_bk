import { useEffect, useState } from 'react';
import { supabase } from '../client/Client';

const useControlBtn = () => {
  const [isAction,setIsAction] = useState(false);
  const [isCounted,setIsCounted] = useState(false);

  // 1. 初始抓取資料
  const fetchList = async () => {
    const { data } = await supabase
      .from('hand_raise_control')
      .select('*');
      setIsAction(data?.[0]?.is_started);
      setIsCounted(data?.[0]?.is_counted);
  };

  useEffect(() => {
    fetchList();

    // 2. 訂閱 Realtime 變更
    const channel = supabase
      .channel('hands-channel-control')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'hand_raise_control' ,filter: `id=eq.1`}, 
        (payload) => {
          fetchList(); 
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const handleActiveEvent = async (status) => {
    await supabase.from('hand_raise_control').update({ is_started: status,updated_at: new Date() })
    .eq('id', 1);
  };

  const handleCountDownEvent = async (status) => {
    console.log('faaa')
    await supabase.from('hand_raise_control').update({ is_counted: status })
    .eq('id', 1);
  }


  return { handleActiveEvent , isAction, handleCountDownEvent,isCounted};
}
export default useControlBtn;