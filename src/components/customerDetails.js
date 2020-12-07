import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from "react-bootstrap";

const CustomerDetails = () => {

  const [data, setData] = useState(null)

  useEffect(() => {
		fetch("https://indapi.kumba.io/webdev/assignment")
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setData({ ...response });
			});
	}, []);

    return (
			<>
				<div>This is the customer detail page</div>
				<Container>
					<Row>
						<Col md={4}></Col>
						<Col>
							{data && 
                <>
                  <p>{data.user.name}</p>
                  <p>{data.user.address} </p>
                  <p>{data.user.about}</p>
                  <p>{data.user.likes}</p>
                </>
              }
						</Col>
					</Row>
				</Container>
				<div>
					<a href="/order-summary">You can go to the order summary from here</a>
				</div>
			</>
		);
}

export default CustomerDetails;