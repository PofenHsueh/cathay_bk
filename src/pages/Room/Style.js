import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

// 1. 全域樣式設定 
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    font-family: "PingFang TC", "Microsoft JhengHei", sans-serif;
  }
`;

// 滿版容器
export const FullPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;


export const MainContent = styled.main`
  flex: 1;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow:hidden;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 40px;
  font-weight: bold;
`;

// 滿版寬度的按鈕區域
export const ActionWrapper = styled.div`
  width: 100%;
  max-width: 600px; /* 在大螢幕限制最大寬度以維持美感，但在手機會填滿 */
  margin-bottom: 40px;
`;

export const RaiseHandBtn = styled.button`
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(to right, #4caf50, #008254); /* 漸層綠色 */
  color: white;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 130, 84, 0.2);
  
  &:active {
    transform: scale(0.97);
  }
  &:disabled{
    cursor: none;
    background:grey;
    transform: none;
  }
`;

// 排序列表區塊 (不再浮空)
export const ListSection = styled.section`
  width: 100%;
  max-width: 600px;
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
  overflow:scroll;
`;

export const ListTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 5px;
`;

export const Label = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 管理者按鈕組
export const AdminControlGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
`;

export const ClearBtn = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 50px;
  font-size: 16px;
  color: #555;
  cursor: pointer;
`;

export const StartBtn = styled(ClearBtn)`
  border: none;
  background-color: #6fb56f; /* 實心綠色 */
  color: white;
  font-weight: bold;
`;


const float = keyframes`
  0%, 100% {
    transform: scale(1) translateY(0);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  50% {
    transform: scale(1) translateY(-10px);
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.8);
  }
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 10px;
  border-bottom: 1px solid #f9f9f9;
  animation: ${(props) => (props.$isFirst ? css`${float} 2s infinite ease-in-out` : 'none')};
`;

export const FirstPlaceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  width: 100px;
  border: 2px solid #ffd700;
  
  /* 引用定義好的動畫變數 */
  animation: ${float} 2s infinite ease-in-out;
`;


export const NameGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  color: #333;
`;

export const TimeText = styled.span`
  font-size: 14px;
  color: #999;
`;

export const CloseIcon = styled.span`
  font-size: 20px;
  color: #999;
  cursor: pointer;
`;


export const LogoutBtn = styled(ClearBtn)`
  border: none;
  background-color: #8abbd8ff;
  color: white;
  font-weight: bold;
  width:100%;
`;