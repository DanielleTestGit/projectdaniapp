const ProductController = require('../product.controller');
const request = require('request-promise');

describe('Test Product APIs', () => {
   
    test('Create a new product', () => {
        let newNameSave = Math.random().toString(36).replace(/[^a-z]+/g, '');
        const productCreateOption = {
            method: 'POST',
            uri: 'http://localhost:1234/products/create',
            json: true,
            body: {
                "name":newNameSave,
                "price":"3",
                "description":"Test Save API using Jest"
            }
          };
        
        return request(productCreateOption)
        .then((responseCreate) => {
            console.log('TEST API Create >>> ', responseCreate);
            expect(responseCreate.name).toContain(newNameSave);
            return null;
        })
    })

    test('Find One product', () => {
        let newNameFind = Math.random().toString(36).replace(/[^a-z]+/g, '');
        const productCreateToFindOption = {
            method: 'POST',
            uri: 'http://localhost:1234/products/create',
            json: true,
            body: {
                "name":newNameFind,
                "price":"3",
                "description":"Test Save API using Jest"
            }
          };
        
        return request(productCreateToFindOption)
        .then((responseCreateToFind) => {
            console.log('TEST API Create to Find >>> ', responseCreateToFind);

            expect(responseCreateToFind.name).toContain(newNameFind);
            const productFindOption = {
                method: 'GET',
                uri: 'http://localhost:1234/products/'+responseCreateToFind._id,
                json: true
              };
            
            return request(productFindOption)
            .then((responseFind) => {
                console.log('TEST API Find  >>> ', responseFind);
                expect(responseFind.name).toContain(newNameFind);
                expect(responseFind.price).toBe(3);
                return null;
            })
        })
    })

    test('Update a product', () => {
        let newNameUpdate = Math.random().toString(36).replace(/[^a-z]+/g, '');
        const productCreateToUpdateOption = {
            method: 'POST',
            uri: 'http://localhost:1234/products/create',
            json: true,
            body: {
                "name":"rosas",
                "price":"3",
                "description":"Test Save API using Jest"
            }
          };
        
        return request(productCreateToUpdateOption)
        .then((responseCreateToUpdate) => {
            console.log('TEST API Create to Find >>> ', responseCreateToUpdate);

            expect(responseCreateToUpdate.name).toContain("rosas");
            const productUpdateOption = {
                method: 'PUT',
                uri: 'http://localhost:1234/products/'+responseCreateToUpdate._id+'/update',
                json: true,
                body: {
                    "name":newNameUpdate,
                    "price":"3",
                    "description":"Test Update API using Jest"
                }
            };
            
            return request(productUpdateOption)
            .then((responseUpdate) => {
                console.log('TEST API Update >>> ', responseUpdate);
                expect(responseUpdate).toContain('Update succesfully!');
                const productFindUpdateOption = {
                    method: 'GET',
                    uri: 'http://localhost:1234/products/'+responseCreateToUpdate._id,
                    json: true
                  };
                
                return request(productFindUpdateOption)
                .then((responseFindUpdate) => {
                    console.log('TEST API Find Updated Product >>> ', responseFindUpdate);
                    expect(responseFindUpdate.name).toContain(newNameUpdate);
                    expect(responseFindUpdate.price).toBe(3);
                    return null;
                })
            })
        })
    })

    test('Delete a product', () => {
        let newNameDelete = Math.random().toString(36).replace(/[^a-z]+/g, '');
        const productCreateToDeleteOption = {
            method: 'POST',
            uri: 'http://localhost:1234/products/create',
            json: true,
            body: {
                "name":newNameDelete,
                "price":"3",
                "description":"Test Save API using Jest"
            }
          };
        
        return request(productCreateToDeleteOption)
        .then((responseCreateToDelete) => {
            console.log('TEST API Create to Delete >>> ', responseCreateToDelete);

            expect(responseCreateToDelete.name).toContain(newNameDelete);
            const productFindToDeleteOption = {
                method: 'GET',
                uri: 'http://localhost:1234/products/'+responseCreateToDelete._id,
                json: true
              };
            
            return request(productFindToDeleteOption)
            .then((responseFindToDelete) => {
                console.log('TEST API Find to Delete >>> ', responseFindToDelete);
                expect(responseFindToDelete.name).toContain(newNameDelete);
                expect(responseFindToDelete.price).toBe(3);
                const productDeleteOption = {
                    method: 'DELETE',
                    uri: 'http://localhost:1234/products/'+responseCreateToDelete._id+'/delete',
                    json: true,
                  };
                
                return request(productDeleteOption)
                .then((responseDelete) => {
                    console.log('TEST API Delete>>> ', responseDelete);
                    expect(responseDelete).toContain("Deleted successfully!");
                    return null;
                })
            })
        })
    })
})
        
  