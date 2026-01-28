import { useEffect, useState } from 'react'
import { supabase } from '../client/Client'
import { v4 as uuidv4 } from 'uuid';
import useHandList from '../hooks/useHandList';
import useAuth from '../hooks/useAuth';

const ChatItem =( {userName} ) => {
  const [disabled, setDisabled] = useState(false);
  const [raiseHandList,setRaiseHandList] = useState([]);
  const test = useHandList();
  const aaa = useAuth();

  // // 即時監聽第一個舉手
  // useEffect(() => {
  //   const channel = supabase
  //     .channel('hands-channel')
  //     .on(
  //       'postgres_changes',
  //       { event: 'INSERT', schema: 'public', table: 'hand_raises' },
  //       payload => {
  //         console.log(payload)
  //         getRaiseHandList()
  //       }
  //     )
  //     .subscribe()

  //   return () => {
  //     supabase.removeChannel(channel)
  //   }
  // }, [])

  // const aa = async()=>{
  //  const b=  await aaa.getProfileInfo();
  //  console.log('b :>> ', b);
  // }

  // useEffect(()=>{
  // aa()
  // },[])


  const raiseHand = async () => {
    setDisabled(true)
    await supabase.from('hand_raises').insert({
      id: uuidv4(),
      username:userName,
    })
  }

  // const getRaiseHandList = async() => {
  //   const { data } = await supabase.from('hand_raises').select('*').order('created_at', { ascending: false });
  //   setRaiseHandList(data)
  // }

  return (
    <div>
      <button onClick={raiseHand}>
        ✋ 舉手
      </button>
      {raiseHandList&&raiseHandList.map(val=><div>{val.id}_{val.username}:{val.created_at}</div>)}
      {/* {raiseHandList && (
        <h2>🎉 第一個是：{winner.username}</h2>
      )} */}
    </div>
  )
}

export default ChatItem;