db.createCollection('products');
db.products.insertMany([
    { name: 'Quipitos!', price: 99000, quantity: 35, uuid: 'b6458a15-6776-4dcf-a05d-898d344187f2' },
    { name: 'Frutiño', price: 55000, quantity: 40, uuid: '28ef66fd-7291-4443-8e9d-a2aa01931602' },
    { name: 'Knor', price: 76400, quantity: 100, uuid: '6ea2220e-6daa-402c-aed2-c8f1e1b18f83' },
    { name: 'Saltin noel', price: 10000, quantity: 63, uuid: 'a6ef7927-11a9-476c-ac00-2e7d5e040a73' },
    { name: 'Vive 100', price: 14500, quantity: 105, uuid: '73bd007b-2e23-452b-a418-764ea2652f45' }
])