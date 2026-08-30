import { useEffect, useState } from 'react';

export default function BootScreen() {
  const [bootDone, setBootDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  // ===== boot screen =====
  useEffect(() => {
    let doneTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    const handleLoad = () => {
      doneTimer = setTimeout(() => {
        setBootDone(true);
        removeTimer = setTimeout(() => setRemoved(true), 700);
      }, 3000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(doneTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div id="bootScreen" className={`boot-screen${bootDone ? ' boot-done' : ''}`}>
      <svg className="boot-seal" viewBox="0 0 120 120">
        <circle className="boot-seal-ring" cx={60} cy={60} r={50} />
        <text x={60} y={72} textAnchor="middle">名</text>
      </svg>
      <p className="boot-godspell boot-godspell-en">dev.godspell</p>
      <p className="boot-godspell boot-godspell-jp">ゴッドスペル</p>
    </div>
  );
}
