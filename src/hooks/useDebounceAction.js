import  { useState, useCallback, useRef } from 'react';

/**
 * 防止連點的自定義 Hook
 * @param {Function} callback 原始點擊函數
 * @param {number} delay 延遲時間 (ms)
 * @returns [執行函數, 是否處理中]
 */
const useDebounceAction = (callback, delay = 500) =>{
  const [loading, setLoading] = useState(false);
  const lastClickTime = useRef(0);

  const executeAction = useCallback(async (...args) => {
    const now = Date.now();
    
    // 判斷是否在冷卻時間內
    if (now - lastClickTime.current < delay || loading) {
      console.log('連點已被阻截！');
      return;
    }

    lastClickTime.current = now;
    setLoading(true);

    try {
      // 執行傳入的非同步或同步任務
      await callback(...args);
    } finally {
      // 任務完成後解鎖 (或根據需求延長冷卻)
      setLoading(false);
    }
  }, [callback, delay, loading]);

  return [executeAction, loading];
}

export default useDebounceAction;