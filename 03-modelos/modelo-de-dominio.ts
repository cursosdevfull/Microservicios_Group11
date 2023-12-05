// Modelo de dominio
enum COUNTRY {
  PE = "PE",
  CO = "CO",
  CL = "CL",
  MX = "MX",
}

class Address {
  location: string;
  city: string;
  country: string;

  constructor(location: string, city: string, country: string) {
    if (country.length != 2) throw "Country must have two characters";
    if (!(country in COUNTRY)) throw "Country can only be PE, CO, CL, MX";

    if (location.length < 10) throw "Location must have at least 10 characters";
    if (city.length < 4) throw "City must have at least 4 characters";

    this.location = location;
    this.city = city;
    this.country = country;
  }
}

class User {
  id: number;
  name: string;
  lastname: string;
  addresses: Array<Address>;
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;

  constructor(
    id: number,
    name: string,
    lastname: string,
    addresses: Array<Address>
  ) {
    if (id < 1) throw "Id must be a positive number";
    if (name.length < 3) throw "Name must have at least 3 characters";
    if (lastname.length < 3) throw "Lastname must have at least 3 characters";

    if (addresses.length === 0) throw "Addresses must have at least 1 address";

    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.addresses = addresses;
    this.createdAt = new Date();
  }

  update(name?: string, lastname?: string, addresses?: Array<Address>) {
    if (name && name.length < 3) throw "Name must have at least 3 characters";
    if (lastname && lastname.length < 3)
      throw "Lastname must have at least 3 characters";

    if (addresses && addresses.length === 0)
      throw "Addresses must have at least 1 address";

    if (name) this.name = name;
    if (lastname) this.lastname = lastname;
    if (addresses) this.addresses = addresses;
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}

const user = new User(1, "Carla", "Rojas", [
  new Address("Jiron Rosales 134", "Ciudad Jardín", "CO"),
  new Address("Calle De los Héroes", "Ciudad Eterna", "PE"),
]);

console.log("original", user);

user.update("Javier", undefined, [
  new Address("Calle Los Botoneros 345", "Andahuaylas", "PE"),
]);

console.log("updated", user);
