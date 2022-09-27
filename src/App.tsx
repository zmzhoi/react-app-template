import { CSSProperties } from 'react';

function App() {
  /**
   * Remove code below
   */
  const style: CSSProperties = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flex: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#2d2d2d',
    color: 'white',
  };
  return (
    <div style={style}>
      <h1>{`<React App Template />`}</h1>
    </div>
  );
}

export default App;
