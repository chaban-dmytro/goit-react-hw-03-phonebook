import React, { Component } from 'react';
import AddContact from './AddContact/AddContact';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onAddNewContact = values => {
    if (
      this.state.contacts.some(
        contact =>
          contact.name.toLowerCase().trim() === values.name.toLowerCase().trim()
      )
    ) {
      alert(`${values.name} is already in contacts!`);
      return;
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, values],
      }));
    }
  };

  onFilterInputChange = event => {
    console.log(this.state.contacts);
    this.setState({ filter: event.target.value });
  };

  getFilterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <>
        <h1>Phonedook</h1>
        <AddContact onAddNewContact={this.onAddNewContact}></AddContact>
        <h2>Contacts</h2>
        <Filter
          onFilterInputChange={this.onFilterInputChange}
          array={this.state.contacts}
        ></Filter>
        <ContactList
          array={this.getFilterContacts()}
          onDeleteContact={this.onDeleteContact}
        ></ContactList>
      </>
    );
  }
}

export default App;
