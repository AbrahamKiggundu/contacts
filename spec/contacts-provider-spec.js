var ContactsProvider = require('../app/contacts-provider');
var contactsProvider = new ContactsProvider('mongodb://localhost/unicefcontactstest');

describe("ContactsProvider", function () {

    // REFACTOR: there must be a better way to do this
    afterEach(function() {
        contactsProvider.deleteAll();
    });

    it("should add a new contact", function(done) {
      contactsProvider.add( { firstname : "test", lastname : "user1", phone : "+254782443432" }, function(err, newContact) {
          expect(newContact.firstname).toBe("test");
          expect(newContact._id).toBeDefined();
          expect(newContact.createdOn).toBeDefined();
          done();
      });
    });

    it("should find all contacts", function(done) {
      contacts = [{ firstname : "test", lastname : "user1", phone : "+254782443432" },
                  { firstname : "test", lastname : "user2", phone : "+254782443431" }];

      contactsProvider.addAll(contacts, function() {
        contactsProvider.findAll(function(err, contacts) {
          expect(contacts.length).toBe(2);
          done();
        });
      });
    });

    it("should find contacts by name", function(done) {
      contacts = [{ firstname : "test", lastname : "user1", phone : "+254782443432" },
                  { firstname : "test1", lastname : "user2", phone : "+254782443431" }];

      contactsProvider.addAll(contacts, function() {
        contactsProvider.find( { firstname: 'test1' }, function(err, contacts) {
          expect(contacts.length).toBe(1);
          done();
        });
      });
    });

    it("should find ONE contact by phone number", function(done) {
      contacts = [{ firstname : "test", lastname : "user1", phone : "+254782443432" },
                  { firstname : "test1", lastname : "user2", phone : "+25477555555" }];

      contactsProvider.addAll(contacts, function() {
        contactsProvider.findOne( { phone : "+25477555555" }, function(err, contact) {
          expect(contact.phone).toEqual("+25477555555");
          done();
        });
      });
    });
});
