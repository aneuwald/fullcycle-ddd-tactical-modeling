import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order-item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/valueObject/address";

const customer = new Customer("c123", "John Doe");

const address = new Address("Street 1", 123, "1231513", "Lisbon");

customer.setAddress(address);

customer.activate();

console.log(customer)

const item1 = new OrderItem("prod1", "Product 1", 10, 1, "prod1");
const item2 = new OrderItem("prod2", "Product 2", 20, 3, "prod2");

const order = new Order("order1", "c123", [item1, item2]);

console.log(order)