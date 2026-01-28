import React,{ useEffect, useState }  from 'react';
import { useNavigate } from 'react-router';
import * as Style from './Style';
import useHandList from '../../hooks/useHandList';
import useAuth from '../../hooks/useAuth';


const Room = () => {
  // const [isAction,setIsAction] = useState(false) 
  const raiseHandEvent = useHandList();
  const adminLogin = useAuth();
  const navigate = useNavigate();



  const handleRaiseHandEvent = async()=>{
    const role =localStorage.getItem('role');
    await raiseHandEvent.raiseHand(role);
    // setIsAction(false);
  }

  const handleLogout = async() => {
    await adminLogin.handleLogout();
    localStorage.removeItem('role');
    navigate('/login');
  }

  const handleClearAll = async () =>{
    await raiseHandEvent.clearAll();
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
        <Style.MainContent>

          {/* 行動區域 */}
          <Style.ActionWrapper>
            {(localStorage.getItem('role')!=='admin_team') ? (
              <Style.RaiseHandBtn onClick={() => handleRaiseHandEvent()} >
                ✋ 舉手！
              </Style.RaiseHandBtn>
            ) : (
              <div>
              <Style.AdminControlGroup>
                <Style.ClearBtn onClick={() => handleClearAll()}>清除</Style.ClearBtn>
                <Style.StartBtn >開始</Style.StartBtn>
              </Style.AdminControlGroup>
              <Style.LogoutBtn onClick={()=>handleLogout()}>Logout</Style.LogoutBtn>
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
