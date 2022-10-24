//Проверка данных по резерву
const expectedItems = [
    {
        ItemId: "105202",
        ExternalId: "Order_Number_One",
        ReservedQty: 2.0
    },
    {
        ItemId: "100901", 
        ExternalId: "Order_Number_One",
        ReservedQty: 3.0
    }
];

pm.test("Check reservedQty for Reserve", function () {
    var jsonData = pm.response.json();

    expectedItems.forEach(expectedItem => {
        console.log(`Checking ${expectedItem.ItemId}`);
        const elementToCheck = jsonData.Body.WareItem.find(el => 
                (
                    el.ItemId === expectedItem.ItemId && 
                    el.ExternalId === expectedItem.ExternalId
                )
            );
        pm.expect(expectedItem.ReservedQty).to.eql(elementToCheck.ReservedQty);
     });
});

//Проверка данных по строкам
const expectedItems = [
    {
        ItemId: "100901",
        ReservedQty: 3.0,
        ExternalId: "Order_Number_One",
        OrderedQty: 3.0,
        SalesOrderId: "Order"
    },
    {
        ItemId: "105202",
        ReservedQty: 6.0,
        ExternalId: "Order_Number_One",
        OrderedQty: 6.0,
        SalesOrderId: "Order"
    }
];

pm.test("Check reservedQty for Order", function () {
    var jsonData = pm.response.json();

    expectedItems.forEach(expectedItem => {
        console.log(`Checking ${expectedItem.ItemId}`);
        const elementToCheck = jsonData.Body.Item.find(el => 
                (
                    el.ItemId === expectedItem.ItemId && 
                    el.ExternalId === expectedItem.ExternalId &&
                    el.SalesOrderId === expectedItem.SalesOrderId
                )
            );
        pm.expect(expectedItem.ReservedQty).to.eql(parseInt(elementToCheck.ReservedQty, 10));
        pm.expect(expectedItem.OrderedQty).to.eql(parseInt(elementToCheck.OrderedQty, 10));
     });
});