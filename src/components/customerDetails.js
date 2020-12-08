import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from "react-bootstrap";

const CustomerDetails = () => {

  const [data, setData] = useState({})

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
							{!data.user && "Loading..."}
							{data.user && (
								<>
									<ul>
										<li>{data.user.name}</li>
										<li>{data.user.address} </li>
										<li>{data.user.phone}</li>
									</ul>
								</>
							)}
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