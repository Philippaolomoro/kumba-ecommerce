# Things to do : 3

- If the order has more items, a parent component would be created called `orderSummaries.js` where the data would be fetched and would map into the child component which now becomes `orderSummary.js`. A clear representation is as follows:

```

  import React, { useEffect, useState } from "react";
 
  const OrderSummaries = () => {
    const [data, setData] = useState({});
    
    useEffect(() => {
      fetch("https://indapi.kumba.io/webdev/assignment")
        .then((response) => response.json())
        .then((response) => {
          setData({ ...response });
        });
    }, []);
    
    return (
      <React.Fragment>
        {data.map((item) => {
          return <OrderSummary data={data} />;
        })}
      </React.Fragment>
    );
  };

```

- The child component takes in a prop `{data}` and would contain the logic for one order