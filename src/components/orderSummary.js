import React, { useEffect, useState, useMemo } from "react"; 
import {Row, Col, Card, Container} from "react-bootstrap";

const OrderSummary = () => {
  const [data, setData] = useState({});

	useEffect(() => {
		fetch("https://indapi.kumba.io/webdev/assignment")
			.then((response) => response.json())
			.then((response) => {
				setData({ ...response });
			});
  }, []);
  
  const total = useMemo(() => {
    if (!data.items) return 'calculating...';

    return data.items.reduce((total, item) => {
      const { price, quantity, tax_pct } = item;
      const net = price * quantity;
      const tax = net * tax_pct / 100;

      return net + tax + total;
    }, 0);
  }, [data.items]);

	return (
		<>
			<Container fluid>
				<div>This is the order summary page</div>
				<div>
					<a href="/">You can go to the customer detail from here</a>
					<Row>
						<Col>
							<Card>
								<Card.Body>
									<Card.Title>ADDRESS DETAILS</Card.Title>
									<Card.Text>
										{data.user && (
											<>
												<ul>
													<li>{data.user.name}</li>
													<li>{data.user.address} </li>
													<li>{data.user.phone}</li>
												</ul>
											</>
										)}
									</Card.Text>
								</Card.Body>
							</Card>
							<Card>
								<Card.Body>
									<Card.Title>RESTAURANT DETAILS</Card.Title>
									<Card.Text>
										{data.restaurant && (
											<>
												<ul>
													<li>{data.restaurant.name}</li>
													<li>{data.restaurant.street} </li>
													<li>{data.restaurant.city}</li>
                          <li>{data.restaurant.state}</li>
												</ul>
											</>
										)}
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Card>
								<Card.Body>
									<Card.Title>ORDER SUMMARY</Card.Title>
									<Card.Text>
										<table>
											<thead>
												<tr>
													<td>Name</td>
													<td>Category</td>
													<td>Price</td>
													<td>Quantity</td>
													<td>tax_pct</td>
												</tr>
											</thead>
											<tbody>
												{!data.items && "Loading..."}
												{data.items &&
													data.items.map((item) => {
														const {
															name,
															category,
															price,
															quantity,
															tax_pct,
														} = item;

														return (
															<tr>
																<td>{name}</td>
																<td>{category}</td>
																<td>{price}</td>
																<td>{quantity}</td>
																<td>{tax_pct}</td>
															</tr>
														);
													})}
												<div>
													<h4>Total</h4>
													<p>{total}</p>
												</div>
											</tbody>
										</table>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			</Container>
		</>
	);
};

export default OrderSummary;
