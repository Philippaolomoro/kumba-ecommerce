import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, CardHeader} from "reactstrap";

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
				<Container>
					<div>
						<h2>Welcome Back</h2>
					</div>
					<div>
						<p>
							<a href="/order-summary">Order Summary</a>
						</p>
					</div>
				</Container>
				<Container>
					<Row>
						<Col md={4} lg="4">
							<img
								src="https://res.cloudinary.com/philippa/image/upload/v1607555014/profile-pic-icon_qmach2.png"
								alt="dummy profile pic"
								width="200px"
								height="200px"
							/>
						</Col>
						<Col>
							<Card>
								<CardHeader>ACCOUNT INFORMATION</CardHeader>
								{!data.user && "Loading..."}
								{data.user && (
									<>
										<Row xs="2">
											<Col>
												<h5>Contact Information</h5>
												<p>{data.user.name}</p>
												<p>{data.user.phone}</p>
											</Col>
											<Col>
												<h5>Address Book</h5>
												<p className="bold">Default Shipping Address</p>
												<p>{data.user.address}</p>
											</Col>
											<Col>
												<h5>Other Information</h5>
												<p>
													<span className="bold">About: </span>
													{data.user.about}
												</p>
												<p>
													<span className="bold">Likes: </span>
													{data.user.likes.join(", ")}
												</p>
												<p>
													<span className="bold">Dislikes: </span>
													{data.user.dislikes.join(", ")}
												</p>
											</Col>
											<Col>
												<p className="bold">Default Billing Address</p>
												<p>You have not set a default billing address</p>
											</Col>
										</Row>
									</>
								)}
							</Card>
						</Col>
					</Row>
				</Container>
				<div></div>
			</>
		);
}

export default CustomerDetails;