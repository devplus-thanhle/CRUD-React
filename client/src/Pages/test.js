import React, { useEffect } from "react";

function Test(props) {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    console.log("didmount");

    return () => {
      console.log("unmount");
    };
  }, [count]);
  console.log("mounting");

  return (
    <div>
      <p>aaaaaaaaaaaaaaaaaaaaaa</p>
      {console.log("mount")}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}

export default Test;
