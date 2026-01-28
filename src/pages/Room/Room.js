import { useEffect }  from 'react';
import { useNavigate } from 'react-router';
import * as Style from './Style';
import useHandList from '../../hooks/useHandList';
import useAuth from '../../hooks/useAuth';
import useControlBtn from '../../hooks/useControlBtn';
import useDebounceAction from '../../hooks/useDebounceAction'
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Room = () => {
  const raiseHandEvent = useHandList();
  const adminLogin = useAuth();
  const controlEvent = useControlBtn();

  const navigate = useNavigate();
  let lastClick = 0;


  const handleRaiseHandEvent = async()=>{
    const now = Date.now();
    // console.log(now - lastClick ,'now - lastClick ')
    if (now - lastClick < 1000) return 
    const role =localStorage.getItem('role');
    try{
      await raiseHandEvent.raiseHand(role);
      await controlEvent.handleActiveEvent(false);
    }catch(e){
      console.log(e,'handleRaiseHandEvent')
    }
  }
  const [debouncedSubmit, isPending] = useDebounceAction(handleRaiseHandEvent, 800);

  const handleLogout = async(isAdmin) => {
    if(isAdmin){
      await adminLogin.handleLogout();
    }
    localStorage.removeItem('role');
    navigate('/login');
  }

  const handleClearAll = async () =>{
    await raiseHandEvent.clearAll();
  }

  const handleStart = async(status) =>{
    await controlEvent.handleActiveEvent(status);
  }


  useEffect(()=>{
    if(!localStorage.getItem('role')){
      navigate('/login');
    }
  },[])

  return (
    <>
      <Style.GlobalStyle />
      <Style.FullPageContainer>
        <Style.MainContent role={localStorage.getItem('role')==='admin_team'}>

          {/* 行動區域 */}
          <Style.ActionWrapper>
            {localStorage.getItem('role')!=='admin_team'&&
            <Button icon={<CloseCircleOutlined />} size='large' type="ghost" className='close' onClick={()=>handleLogout(false)}>
            重新輸入暱稱
            </Button>}
            {(localStorage.getItem('role')!=='admin_team') ? (
              <Style.RaiseHandBtn onClick={() => debouncedSubmit()} disabled={!controlEvent?.isAction}>
                ✋ 舉手！
              </Style.RaiseHandBtn>
            ) : (
              <div>
              <Style.AdminControlGroup>
                <Style.ClearBtn onClick={() => handleClearAll()}>清除</Style.ClearBtn>
                <Style.StartBtn onClick={()=>handleStart(true)} disabled={controlEvent?.isAction}>開始</Style.StartBtn>
              </Style.AdminControlGroup>
              <Style.LogoutBtn onClick={()=>handleLogout(true)}>Logout</Style.LogoutBtn>
              </div>
            )}
          </Style.ActionWrapper>

          {/* 列表區域 */}
          <Style.ListSection>
            <Style.ListTitleRow>
              <Style.Label>🏆 順序</Style.Label>
            </Style.ListTitleRow>
            {raiseHandEvent?.list?.map((s,index) => (
              <Style.ListItem key={s.id} $isFirst={index === 0}>
                <Style.NameGroup>
                  <span>{s.username}</span>
                </Style.NameGroup>
                <Style.TimeText>{s.created_at}</Style.TimeText>
              </Style.ListItem>
            ))}
          </Style.ListSection>
        </Style.MainContent>
      </Style.FullPageContainer>
    </>
  
  );
};

export default Room;
