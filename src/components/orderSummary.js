import React, { useEffect, useState, useMemo } from "react"; 
import {Card} from "react-bootstrap";
import CardDeck from "react-bootstrap/CardDeck";

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
			<div>This is the order summary page</div>
			<div>
				<a href="/">You can go to the customer detail from here</a>
				<CardDeck>
						<Card>
							<Card.Body>
								<Card.Title>ADDRESS DETAILS</Card.Title>
								<Card.Text>
									This card has supporting text below as a natural lead-in to
									additional content.{" "}
								</Card.Text>
							</Card.Body>
						</Card>
						<Card>
							<Card.Body>
								<Card.Title>RESTAURANT DETAILS</Card.Title>
								<Card.Text>
									This card has supporting text below as a natural lead-in to
									additional content.{" "}
								</Card.Text>
							</Card.Body>
						</Card>
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
										<tr>
											<td>{total}</td>
										</tr>
									</tbody>
								</table>
							</Card.Text>
						</Card.Body>
					</Card>
				</CardDeck>
			</div>
		</>
	);
};

export default OrderSummary;
