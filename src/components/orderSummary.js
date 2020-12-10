import React, { useEffect, useState, useMemo } from "react"; 
import {Row, Col, Card, CardBody, CardHeader, Container, Table} from "reactstrap";

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
				<h2>Order Summary Page</h2>
				<div>
					<a href="/">My Account</a>
					<Row>
						<Col lg="4">
							<Card>
								<CardBody>
									<CardHeader>ADDRESS DETAILS</CardHeader>
									<div>
										{data.user && (
											<>
												<h5>{data.user.name}</h5>
												<p>{data.user.address}</p>
												<p>{data.user.phone}</p>
											</>
										)}
									</div>
								</CardBody>
							</Card>
							<br />
							<Card>
								<CardBody>
									<CardHeader>RESTAURANT DETAILS</CardHeader>
									{!data.restaurant && "Loading..."}
									{data.restaurant && (
										<>
											<p>{data.restaurant.name}</p>
											<p>{data.restaurant.street}</p>
											<p>{data.restaurant.city}</p>
											<p>{data.restaurant.state}</p>
										</>
									)}
								</CardBody>
							</Card>
						</Col>
						<Col lg="8">
							<Card>
								<CardBody>
									<CardHeader>ORDER SUMMARY</CardHeader>
									<Table responsive>
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
														currency,
														tax_pct,
													} = item;

													return (
														<tr key={name}>
															<td>{name}</td>
															<td>{category}</td>
															<td>{currency} {price}</td>
															<td>{quantity}</td>
															<td>{tax_pct}</td>
														</tr>
													);
												})}
										</tbody>
									</Table>
									<div className="total-section">
										<h4>Total</h4>
										<p>INR {total}</p>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</Container>
		</>
	);
};

export default OrderSummary;
