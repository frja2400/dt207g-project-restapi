# REST API för projektarbete

Detta repository innehåller kod för ett REST API byggt med Node.js, Express och MongoDB Atlas. API:t är utvecklat för en fiktiv restaurang och hanterar användare, menyobjekt samt kundbeställningar.

CRUD-funktionalitet finns för menyhantering och ordrar. Användarhantering innefattar registrering, inloggning och JWT-baserad autentisering för adminfunktioner.

## Länk

En liveversion av API:t finns tillgänglig på följande URL: 

## Installation, databas

API:et använder MongoDB Atlas för datalagring.
För att installera och köra lokalt:

- git clone https://github.com/frja2400/dt207g-project-restapi.git
- npm install
- Skapa en .env-fil och ange miljövariabler enligt .env-sample.
- Starta servern: npm run dev

## Datamodeller

```js
//Användare
{
  email: String,
  password: String
}

//Meny
{
  name: String,
  category: String,
  price: Number,
  description: String,
  isVegan: Boolean,
  updatedBy: ObjectId (referens till User)
}

//Order
{
  customerName: String,
  items: [
    {
      menuItem: ObjectId (referens till MenuItem),
      quantity: Number
    }
  ],
  phoneNumber: String,
  address: {
    street: String,
    postalCode: String,
    city: String
  },
  status: String,
  totalPrice: Number, //Beräknas automatiskt
  createdAt: Date
}
```

## Användning

**Admin:**
| Metod  | Ändpunkt                  | Beskrivning                                   |
|--------|---------------------------|-----------------------------------------------|
| POST   | `/api/users/register`     | Registrera nya användare.                     |
| POST   | `/api/users/login`        | Logga in användare och få JWT-token.          |

**Meny:**
| Metod  | Ändpunkt                  | Beskrivning                                   |
|--------|---------------------------|-----------------------------------------------|
| GET    | `/api/menu`               | Hämtar alla menyobjekt.                       |
| POST   | `/api/menu`               | Skapar nytt menyobjekt (admin).               |
| PUT    | `/api/menu/:id`           | Uppdaterar menyobjekt (admin).                |
| DELETE | `/api/menu/:id`           | Raderar menyobjekt (admin).                   |

**Ordrar:**
| Metod  | Ändpunkt                  | Beskrivning                                   |
|--------|---------------------------|-----------------------------------------------|
| GET    | `/api/order`              | Hämtar alla ordrar (admin).                   |
| GET    | `/api/order/:id`          | Hämtar enskilda ordrar (admin).               |
| POST   | `/api/order`              | Skapar ny order (tillgänglig för alla).       |
| PUT    | `/api/order/:id`          | Uppdaterar order (admin).                     |
| DELETE | `/api/order/:id`          | Raderar order (admin).                        |

## Säkerhet och validering

- JWT-skyddade routes för adminfunktioner.
- Hasning av löseord med bcrypt.
- Validering av e-post och lösenord.